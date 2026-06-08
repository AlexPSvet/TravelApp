const { Travel, Itinerary } = require('../models/travel');

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Recalculates pricePerPerson from the itinerary
 */
function calcPricePerPerson(itinerary, maxGroupSize) {
  if (!itinerary || !maxGroupSize || maxGroupSize < 1) return 0;

  const transportTotal = (itinerary.transports || []).reduce(
    (sum, t) => sum + (t.price || 0),
    0
  );
  const stopsTotal = (itinerary.stops || []).reduce(
    (sum, s) => sum + (s.pricePerNight || 0) * (s.nights || 0),
    0
  );

  return parseFloat((transportTotal / maxGroupSize + stopsTotal).toFixed(2));
}

/**
 * GET /api/travels
 */
async function getAllTravels(req, res) {
  try {
    const travels = await Travel.find({ status: 'published' })
      .select('title rating pricePerPerson coverImage destination country tags difficulty itinerary')
      .populate({
        path: 'itinerary',
        select: 'stops.nights',
      })
      .lean();

    const result = travels.map((t) => {
      const stops     = t.itinerary?.stops ?? [];
      const totalNights = stops.reduce((sum, s) => sum + (s.nights || 0), 0);
      const duration    = totalNights > 0 ? `${totalNights} days` : null;

      return {
        _id:           t._id,
        title:         t.title,
        destination:   t.destination,
        country:       t.country,
        coverImage:    t.coverImage ?? null,
        rating:        t.rating,
        pricePerPerson: t.pricePerPerson,
        duration,
        tags:          t.tags ?? [],
        difficulty:    t.difficulty,
      };
    });

    res.json(result);
  } catch (err) {
    console.error('getAllTravels error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * POST /api/travels
 */
async function createTravel(req, res) {
  try {
    const {
      title,
      itinerary: itineraryData,
      maxGroupSize,
      ...rest
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'title is required' });
    }

    // Build slug from title; append timestamp suffix to avoid collisions
    const baseSlug = slugify(title);
    const slug = `${baseSlug}-${Date.now()}`;

    // Create the itinerary document first (if provided)
    let itineraryId = null;
    let itineraryDoc = null;

    if (itineraryData) {
      itineraryDoc = await Itinerary.create(itineraryData);
      itineraryId = itineraryDoc._id;
    }

    const pricePerPerson = calcPricePerPerson(itineraryDoc, maxGroupSize);

    const travel = await Travel.create({
      title,
      slug,
      maxGroupSize,
      pricePerPerson,
      itinerary: itineraryId,
      ...rest,
    });

    res.status(201).json(travel);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    console.error('createTravel error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * GET /api/travels/:id
 */
async function getTravel(req, res) {
  try {
    const travel = await Travel.findById(req.params.id).populate('itinerary');

    if (!travel) {
      return res.status(404).json({ message: 'Travel not found' });
    }

    res.json(travel);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid travel id' });
    }
    console.error('getTravel error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PATCH /api/travels/:id
 */
async function updateTravel(req, res) {
  try {
    const travel = await Travel.findById(req.params.id);

    if (!travel) {
      return res.status(404).json({ message: 'Travel not found' });
    }

    const { itinerary: itineraryData, title, maxGroupSize, ...rest } = req.body;

    // Update itinerary if new data was sent
    let itineraryDoc = null;

    if (itineraryData) {
      if (travel.itinerary) {
        // Replace the existing itinerary in-place
        itineraryDoc = await Itinerary.findByIdAndUpdate(
          travel.itinerary,
          itineraryData,
          { new: true, runValidators: true }
        );
      } else {
        // No itinerary linked yet — create one
        itineraryDoc = await Itinerary.create(itineraryData);
        travel.itinerary = itineraryDoc._id;
      }
    } else if (travel.itinerary) {
      // Fetch existing itinerary to recalculate price when maxGroupSize changes
      itineraryDoc = await Itinerary.findById(travel.itinerary);
    }

    // Apply scalar travel field updates
    if (title) {
      travel.title = title;
      // Re-generate slug only when the title actually changes
      if (title !== travel.title) {
        travel.slug = `${slugify(title)}-${Date.now()}`;
      }
    }
    if (maxGroupSize !== undefined) travel.maxGroupSize = maxGroupSize;

    Object.assign(travel, rest);

    // Recalculate derived price
    const groupSize = travel.maxGroupSize;
    travel.pricePerPerson = calcPricePerPerson(itineraryDoc, groupSize);

    await travel.save();

    // Return the fully populated document
    const updated = await Travel.findById(travel._id).populate('itinerary');
    res.json(updated);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid travel id' });
    }
    console.error('updateTravel error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getAllTravels, createTravel, getTravel, updateTravel };

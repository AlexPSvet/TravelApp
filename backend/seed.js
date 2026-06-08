/**
 * Seed script — populates the database with 6 default travel packages.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { Travel, Itinerary } = require('./models/travel');

const seedData = [
  /* ── Paris ── */
  {
    travel: {
      title:       'Weekend in Paris',
      description: 'Discover the Eiffel Tower, Montmartre, and the best Parisian cafés in a romantic long weekend.',
      destination: 'Paris',
      coverImage:  'https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFyJUMzJUFEc3xlbnwwfHwwfHx8MA%3D%3D',
      country:     'France',
      continent:   'Europe',
      tags:        ['Culture', 'Food', 'City Break', 'Romance'],
      difficulty:  'easy',
      maxGroupSize: 12,
      status:      'published',
    },
    itinerary: {
      transports: [
        {
          type:      'flight',
          provider:  'Air France',
          origin:    'London',
          destination: 'Paris CDG',
          duration:  85,
          price:     420,
          seatClass: 'economy',
        },
      ],
      stops: [
        {
          city:              'Paris',
          country:           'France',
          coordinates:       { lat: 48.8566, lng: 2.3522 },
          accommodationType: 'hotel',
          accommodationName: 'Hôtel des Arts Montmartre',
          pricePerNight:     120,
          nights:            3,
          description:       'Stay in the heart of Montmartre, steps away from Sacré-Cœur and vibrant street art.',
          amenities:         ['wifi', 'breakfast included', 'city view'],
          activities: [
            { dayNumber: 1, name: 'Eiffel Tower & Trocadéro', type: 'sightseeing', duration: 3, estimatedCost: 30, included: true, description: 'Visit the iconic iron tower and enjoy panoramic views from Trocadéro gardens.' },
            { dayNumber: 1, name: 'Seine River Cruise', type: 'sightseeing', duration: 1.5, estimatedCost: 20, included: false, description: 'Evening cruise along the Seine passing Notre-Dame and Île Saint-Louis.' },
            { dayNumber: 2, name: 'Louvre Museum', type: 'cultural', duration: 4, estimatedCost: 17, included: false, description: 'Explore the world\'s largest art museum and see the Mona Lisa.' },
            { dayNumber: 2, name: 'Le Marais Food Tour', type: 'food', duration: 3, estimatedCost: 60, included: false, description: 'Guided tour through the best bakeries, fromageries, and bistros in Le Marais.' },
            { dayNumber: 3, name: 'Montmartre & Sacré-Cœur', type: 'cultural', duration: 3, estimatedCost: 0, included: true, description: 'Wander the bohemian streets of Montmartre and visit the stunning Sacré-Cœur basilica.' },
          ],
        },
      ],
    },
  },

  /* ── Milan ── */
  {
    travel: {
      title:       'Fashion & Design in Milan',
      description: 'Immerse yourself in Italian fashion, world-class cuisine, and Renaissance art in Italy\'s style capital.',
      destination: 'Milan',
      coverImage:  'https://storage.googleapis.com/mytour-prod/blog/top-7-curiosities-about-milan_2020-10-wp3823865-1-scaled.jpg',
      country:     'Italy',
      continent:   'Europe',
      tags:        ['Fashion', 'Design', 'Food', 'Art'],
      difficulty:  'easy',
      maxGroupSize: 10,
      status:      'published',
    },
    itinerary: {
      transports: [
        {
          type:      'flight',
          provider:  'EasyJet',
          origin:    'Barcelona',
          destination: 'Milan Malpensa',
          duration:  110,
          price:     380,
          seatClass: 'economy',
        },
      ],
      stops: [
        {
          city:              'Milan',
          country:           'Italy',
          coordinates:       { lat: 45.4642, lng: 9.1900 },
          accommodationType: 'hotel',
          accommodationName: 'Hotel Berna',
          pricePerNight:     135,
          nights:            4,
          description:       'Centrally located hotel near Milan Central Station, within walking distance of the Duomo.',
          amenities:         ['wifi', 'gym', 'rooftop bar'],
          activities: [
            { dayNumber: 1, name: 'Duomo di Milano', type: 'cultural', duration: 2, estimatedCost: 15, included: true, description: 'Climb to the rooftop terraces of the Gothic cathedral for stunning city views.' },
            { dayNumber: 1, name: 'Galleria Vittorio Emanuele II', type: 'shopping', duration: 2, estimatedCost: 0, included: true, description: 'Stroll through one of the world\'s oldest and most beautiful shopping malls.' },
            { dayNumber: 2, name: 'Last Supper by Leonardo da Vinci', type: 'cultural', duration: 1.5, estimatedCost: 25, included: false, description: 'Pre-booked visit to see Leonardo\'s masterpiece at Santa Maria delle Grazie.' },
            { dayNumber: 2, name: 'Brera District Walk', type: 'sightseeing', duration: 3, estimatedCost: 0, included: true, description: 'Explore the artistic Brera neighbourhood with its galleries, cafés, and antique shops.' },
            { dayNumber: 3, name: 'Quadrilatero della Moda', type: 'shopping', duration: 4, estimatedCost: 0, included: false, description: 'Walk the golden rectangle of fashion: Via Montenapoleone, Via della Spiga, and more.' },
            { dayNumber: 4, name: 'Day trip to Lake Como', type: 'adventure', duration: 8, estimatedCost: 30, included: false, description: 'Take the train to Como and explore the stunning lakeside towns of Varenna and Bellagio.' },
          ],
        },
      ],
    },
  },

  /* ── Rome ── */
  {
    travel: {
      title:       'Eternal City: Rome in Depth',
      description: 'Walk through 2,500 years of history — from the Colosseum to Vatican City, one iconic landmark at a time.',
      destination: 'Rome',
      coverImage:  'https://i.natgeofe.com/k/a6c9f195-de20-445d-9d36-745ef56042c5/OG_Colosseum_Ancient-Rome_KIDS_1122_3x2.jpg',
      country:     'Italy',
      continent:   'Europe',
      tags:        ['History', 'Culture', 'Food', 'Art'],
      difficulty:  'easy',
      maxGroupSize: 14,
      status:      'published',
    },
    itinerary: {
      transports: [
        {
          type:      'flight',
          provider:  'Ryanair',
          origin:    'Madrid',
          destination: 'Rome Fiumicino',
          duration:  160,
          price:     310,
          seatClass: 'economy',
        },
      ],
      stops: [
        {
          city:              'Rome',
          country:           'Italy',
          coordinates:       { lat: 41.9028, lng: 12.4964 },
          accommodationType: 'hotel',
          accommodationName: 'Hotel Artemide',
          pricePerNight:     110,
          nights:            5,
          description:       'Elegant hotel steps from Piazza della Repubblica and the Teatro dell\'Opera.',
          amenities:         ['wifi', 'breakfast included', 'spa'],
          activities: [
            { dayNumber: 1, name: 'Colosseum & Roman Forum', type: 'cultural', duration: 4, estimatedCost: 22, included: true, description: 'Guided tour of the Colosseum, Roman Forum, and Palatine Hill.' },
            { dayNumber: 2, name: 'Vatican Museums & Sistine Chapel', type: 'cultural', duration: 5, estimatedCost: 35, included: true, description: 'Skip-the-line access to the Vatican Museums and Michelangelo\'s Sistine Chapel.' },
            { dayNumber: 2, name: 'St. Peter\'s Basilica', type: 'sightseeing', duration: 2, estimatedCost: 0, included: true, description: 'Visit the world\'s largest church and climb the dome for panoramic views.' },
            { dayNumber: 3, name: 'Trevi Fountain & Spanish Steps', type: 'sightseeing', duration: 3, estimatedCost: 0, included: true, description: 'Toss a coin in the Trevi Fountain and enjoy gelato on the Spanish Steps.' },
            { dayNumber: 3, name: 'Trastevere Food Walk', type: 'food', duration: 3, estimatedCost: 45, included: false, description: 'Evening food tour through the charming Trastevere neighbourhood.' },
            { dayNumber: 4, name: 'Borghese Gallery', type: 'cultural', duration: 3, estimatedCost: 20, included: false, description: 'Admire Bernini sculptures and Caravaggio paintings in this stunning villa museum.' },
            { dayNumber: 5, name: 'Day trip to Tivoli', type: 'adventure', duration: 8, estimatedCost: 25, included: false, description: 'Visit Villa d\'Este and its spectacular Renaissance gardens just outside Rome.' },
          ],
        },
      ],
    },
  },

  /* ── Barcelona ── */
  {
    travel: {
      title:       'Barcelona: Gaudí & the Sea',
      description: 'Sun, Gaudí masterpieces, tapas, and vibrant nightlife — Barcelona has it all.',
      destination: 'Barcelona',
      coverImage:  'https://barcelonesite.fr/images/barcelona_2.jpg',
      country:     'Spain',
      continent:   'Europe',
      tags:        ['Architecture', 'Beach', 'Food', 'Nightlife'],
      difficulty:  'easy',
      maxGroupSize: 16,
      status:      'published',
    },
    itinerary: {
      transports: [
        {
          type:      'flight',
          provider:  'Vueling',
          origin:    'Paris',
          destination: 'Barcelona El Prat',
          duration:  120,
          price:     290,
          seatClass: 'economy',
        },
      ],
      stops: [
        {
          city:              'Barcelona',
          country:           'Spain',
          coordinates:       { lat: 41.3851, lng: 2.1734 },
          accommodationType: 'hotel',
          accommodationName: 'Hotel Arts Barcelona',
          pricePerNight:     150,
          nights:            5,
          description:       'Luxury beachfront hotel in the Vila Olímpica district, with direct access to Barceloneta beach.',
          amenities:         ['wifi', 'pool', 'gym', 'beachfront', 'breakfast included'],
          activities: [
            { dayNumber: 1, name: 'Sagrada Família', type: 'cultural', duration: 3, estimatedCost: 26, included: true, description: 'Guided tour of Gaudí\'s unfinished Gothic masterpiece with tower access.' },
            { dayNumber: 1, name: 'Barceloneta Beach', type: 'relaxation', duration: 3, estimatedCost: 0, included: true, description: 'Relax on Barcelona\'s most famous urban beach.' },
            { dayNumber: 2, name: 'Park Güell', type: 'sightseeing', duration: 2.5, estimatedCost: 10, included: true, description: 'Explore Gaudí\'s colourful mosaic park with panoramic views over Barcelona.' },
            { dayNumber: 2, name: 'La Boqueria Market', type: 'food', duration: 2, estimatedCost: 20, included: false, description: 'Browse the famous food market on Las Ramblas and sample fresh local produce.' },
            { dayNumber: 3, name: 'Gothic Quarter Walking Tour', type: 'cultural', duration: 3, estimatedCost: 15, included: false, description: 'Guided stroll through 2,000 years of history in the medieval Gothic Quarter.' },
            { dayNumber: 3, name: 'Tapas Evening in El Born', type: 'food', duration: 3, estimatedCost: 40, included: false, description: 'Bar-hop through the trendy El Born neighbourhood sampling pintxos and local wines.' },
            { dayNumber: 4, name: 'Casa Batlló & Passeig de Gràcia', type: 'cultural', duration: 3, estimatedCost: 35, included: false, description: 'Visit the surreal interior of Casa Batlló and admire the Modernisme buildings along Barcelona\'s grandest boulevard.' },
            { dayNumber: 5, name: 'Montjuïc Castle & Olympic Ring', type: 'adventure', duration: 4, estimatedCost: 10, included: false, description: 'Take the cable car to Montjuïc, visit the castle, and explore the 1992 Olympic facilities.' },
          ],
        },
      ],
    },
  },

  /* ── Madrid ── */
  {
    travel: {
      title:       'Madrid: Art, Flamenco & Tapas',
      description: 'Dive into Spain\'s vibrant capital — world-class museums, lively plazas, and legendary nightlife.',
      destination: 'Madrid',
      coverImage:  'https://images.trvl-media.com/place/178281/edbf43cf-0496-4327-900f-411c38682541.jpg',
      country:     'Spain',
      continent:   'Europe',
      tags:        ['Art', 'Food', 'Nightlife', 'Culture'],
      difficulty:  'easy',
      maxGroupSize: 14,
      status:      'published',
    },
    itinerary: {
      transports: [
        {
          type:      'train',
          provider:  'Renfe AVE',
          origin:    'Barcelona',
          destination: 'Madrid Atocha',
          duration:  165,
          price:     220,
          seatClass: 'standard',
        },
      ],
      stops: [
        {
          city:              'Madrid',
          country:           'Spain',
          coordinates:       { lat: 40.4168, lng: -3.7038 },
          accommodationType: 'hotel',
          accommodationName: 'Hotel Vincci Soho',
          pricePerNight:     100,
          nights:            4,
          description:       'Stylish boutique hotel in the Letras neighbourhood, between the Prado and Reina Sofía museums.',
          amenities:         ['wifi', 'rooftop terrace', 'gym'],
          activities: [
            { dayNumber: 1, name: 'Museo del Prado', type: 'cultural', duration: 4, estimatedCost: 15, included: true, description: 'Explore one of the world\'s finest art collections featuring Velázquez, Goya, and El Greco.' },
            { dayNumber: 1, name: 'Retiro Park', type: 'relaxation', duration: 2, estimatedCost: 0, included: true, description: 'Stroll through Madrid\'s green lung and rent a rowing boat on the lake.' },
            { dayNumber: 2, name: 'Museo Reina Sofía', type: 'cultural', duration: 3, estimatedCost: 12, included: false, description: 'See Picasso\'s Guernica and a vast collection of 20th-century Spanish art.' },
            { dayNumber: 2, name: 'Flamenco Show', type: 'cultural', duration: 2, estimatedCost: 40, included: false, description: 'Authentic flamenco performance with dinner in the Lavapiés neighbourhood.' },
            { dayNumber: 3, name: 'El Rastro Flea Market', type: 'shopping', duration: 3, estimatedCost: 0, included: false, description: 'Browse Europe\'s largest open-air flea market held every Sunday.' },
            { dayNumber: 3, name: 'Tapas Tour in La Latina', type: 'food', duration: 3, estimatedCost: 45, included: false, description: 'Guided tapas crawl through the lively La Latina barrio.' },
            { dayNumber: 4, name: 'Royal Palace of Madrid', type: 'cultural', duration: 3, estimatedCost: 14, included: true, description: 'Tour Europe\'s largest royal palace, still used for state ceremonies.' },
          ],
        },
      ],
    },
  },

  /* ── Moscow ── */
  {
    travel: {
      title:       'Moscow: Red Square & Beyond',
      description: 'Explore the grandeur of Russia\'s capital — from the Kremlin and Red Square to hidden Soviet-era gems.',
      destination: 'Moscow',
      coverImage:  'https://www.isango.com/theguidebook/wp-content/uploads/2022/02/Moscow-1.1.jpg',
      country:     'Russia',
      continent:   'Europe',
      tags:        ['History', 'Architecture', 'Culture', 'Winter'],
      difficulty:  'moderate',
      maxGroupSize: 10,
      status:      'published',
    },
    itinerary: {
      transports: [
        {
          type:      'flight',
          provider:  'Aeroflot',
          origin:    'Paris CDG',
          destination: 'Moscow Sheremetyevo',
          duration:  235,
          price:     560,
          seatClass: 'economy',
        },
      ],
      stops: [
        {
          city:              'Moscow',
          country:           'Russia',
          coordinates:       { lat: 55.7558, lng: 37.6173 },
          accommodationType: 'hotel',
          accommodationName: 'Hotel Metropol Moscow',
          pricePerNight:     145,
          nights:            6,
          description:       'Historic Art Nouveau hotel steps from the Bolshoi Theatre and Red Square, opened in 1905.',
          amenities:         ['wifi', 'spa', 'pool', 'breakfast included', 'concierge'],
          activities: [
            { dayNumber: 1, name: 'Red Square & St. Basil\'s Cathedral', type: 'sightseeing', duration: 3, estimatedCost: 10, included: true, description: 'Walk the iconic cobblestone square and admire the colourful onion domes of St. Basil\'s.' },
            { dayNumber: 1, name: 'GUM Department Store', type: 'shopping', duration: 2, estimatedCost: 0, included: true, description: 'Explore the stunning 19th-century arcade mall on the edge of Red Square.' },
            { dayNumber: 2, name: 'The Kremlin', type: 'cultural', duration: 4, estimatedCost: 20, included: true, description: 'Guided tour of the Kremlin\'s palaces, cathedrals, and the Armoury chamber.' },
            { dayNumber: 2, name: 'Tretyakov Gallery', type: 'cultural', duration: 3, estimatedCost: 15, included: false, description: 'The world\'s largest collection of Russian fine art, including Rublev\'s Trinity icon.' },
            { dayNumber: 3, name: 'Moscow Metro Tour', type: 'cultural', duration: 2, estimatedCost: 5, included: false, description: 'Ride the most beautiful metro in the world — each station is a unique work of art.' },
            { dayNumber: 3, name: 'Arbat Street', type: 'sightseeing', duration: 2, estimatedCost: 0, included: true, description: 'Stroll Moscow\'s oldest pedestrian street lined with cafés, bookshops, and street artists.' },
            { dayNumber: 4, name: 'Bolshoi Theatre Performance', type: 'cultural', duration: 3, estimatedCost: 80, included: false, description: 'Attend a world-renowned ballet or opera performance at the iconic Bolshoi Theatre.' },
            { dayNumber: 5, name: 'Gorky Park & Muzeon', type: 'relaxation', duration: 4, estimatedCost: 0, included: true, description: 'Relax in Moscow\'s most famous park and visit the open-air Muzeon sculpture garden.' },
            { dayNumber: 6, name: 'Novodevichy Convent & Cemetery', type: 'cultural', duration: 3, estimatedCost: 5, included: false, description: 'UNESCO World Heritage site and resting place of Chekhov, Bulgakov, and Khrushchev.' },
          ],
        },
      ],
    },
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await Travel.deleteMany({});
  await Itinerary.deleteMany({});
  console.log('Cleared existing travels and itineraries');

  for (const entry of seedData) {
    const itinerary = await Itinerary.create(entry.itinerary);

    const maxGroupSize = entry.travel.maxGroupSize;
    const transportTotal = entry.itinerary.transports.reduce((sum, t) => sum + t.price, 0);
    const stopsTotal = entry.itinerary.stops.reduce(
      (sum, s) => sum + s.pricePerNight * s.nights,
      0
    );
    const pricePerPerson = parseFloat(
      (transportTotal / maxGroupSize + stopsTotal).toFixed(2)
    );

    const baseSlug = entry.travel.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    await Travel.create({
      ...entry.travel,
      slug: `${baseSlug}-${Date.now()}`,
      pricePerPerson,
      itinerary: itinerary._id,
    });

    console.log(`  OK ${entry.travel.title}`);
  }

  console.log('\nSeeding complete.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

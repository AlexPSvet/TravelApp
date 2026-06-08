const mongoose = require('mongoose');

const { Schema } = mongoose;

/* ─ Transport (embedded in Itinerary)
 * Represents a single leg of transportation between two points.
 * duration is stored in minutes for easy arithmetic.
 */
const transportSchema = new Schema({
  type: {
    type: String,
    enum: ['flight', 'train', 'bus', 'ferry', 'car', 'taxi', 'metro', 'other'],
    required: true,
  },
  provider:          { type: String, required: true, trim: true },
  origin:            { type: String, required: true, trim: true },
  destination:       { type: String, required: true, trim: true },
  departureDateTime: { type: Date },
  arrivalDateTime:   { type: Date },
  duration:          { type: Number, required: true, min: 0 }, // in minutes
  price:             { type: Number, required: true, min: 0 },
  seatClass: {
    type: String,
    enum: ['economy', 'business', 'first', 'standard', 'n/a'],
    default: 'standard',
  },
  bookingReference: { type: String, trim: true },
  notes:            { type: String, trim: true },
});

/* ─ Activity (embedded in Stop)
 * Represents a single activity planned for a specific day at a stop.
 * dayNumber is 1-based relative to the stop's check-in date.
 */
const activitySchema = new Schema({
  name:          { type: String, required: true, trim: true },
  description:   { type: String, trim: true },
  dayNumber:     { type: Number, required: true, min: 1 },
  type: {
    type: String,
    enum: ['sightseeing', 'food', 'adventure', 'cultural', 'shopping', 'relaxation', 'other'],
    default: 'other',
  },
  duration:      { type: Number, min: 0 },     // estimated duration in hours
  estimatedCost: { type: Number, default: 0, min: 0 },
  included:      { type: Boolean, default: false }, // included in overall travel price?
});

/* - Stop (embedded in Itinerary)
 * Represents a city/location stay. Holds accommodation details and the list
 * of daily activities planned during this stay.
 */
const stopSchema = new Schema({
  city:    { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
  accommodationType: {
    type: String,
    enum: ['hotel', 'airbnb', 'hostel', 'resort', 'guesthouse', 'camping', 'other'],
    required: true,
  },
  accommodationName: { type: String, trim: true },
  pricePerNight:     { type: Number, required: true, min: 0 },
  nights:            { type: Number, required: true, min: 1 },
  description:       { type: String, trim: true },
  amenities:         [{ type: String, trim: true }],
  activities:        [activitySchema],
});

/* - Itinerary
 * Top-level document referenced by Travel. Holds the ordered list of transport
 * legs and city stops that make up the journey.
 */
const itinerarySchema = new Schema(
  {
    transports: [transportSchema],
    stops:      [stopSchema],
  },
  { timestamps: true }
);

/* - Travel
 * Main document representing a travel package.
 */
const travelSchema = new Schema(
  {
    title:       { type: String, required: true, trim: true },
    slug:        { type: String, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true },
    coverImage:  { type: String, trim: true },
    images:      [{ type: String }],
    destination: { type: String, required: true, trim: true },
    country:     { type: String, trim: true },
    continent: {
      type: String,
      enum: ['Africa', 'Antarctica', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'],
    },
    tags:        [{ type: String, trim: true }],
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'challenging'],
      default: 'moderate',
    },
    maxGroupSize:   { type: Number, min: 1 },
    pricePerPerson: { type: Number, default: 0, min: 0 },
    rating:         { type: Number, default: 0, min: 0, max: 5 },
    ratingsCount:   { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    itinerary: { type: Schema.Types.ObjectId, ref: 'Itinerary' },
  },
  { timestamps: true }
);

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
const Travel    = mongoose.model('Travel', travelSchema);

module.exports = { Travel, Itinerary };
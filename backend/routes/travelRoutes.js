const { Router } = require('express');
const {
  getAllTravels,
  createTravel,
  getTravel,
  updateTravel,
} = require('../controllers/travelController');

const router = Router();

// GET /api/travels
router.get('/', getAllTravels);

// POST /api/travels
router.post('/', createTravel);

// GET /api/travels/:slug
router.get('/:slug', getTravel);

// PATCH /api/travels/:slug
router.patch('/:slug', updateTravel);

module.exports = router;

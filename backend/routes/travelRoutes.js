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

// GET /api/travels/:id
router.get('/:id', getTravel);

// PATCH /api/travels/:id
router.patch('/:id', updateTravel);

module.exports = router;

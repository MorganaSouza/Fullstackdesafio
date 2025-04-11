const express = require('express');
const router = express.Router();
const {
    createFertilizer,
    getFertilizers,
    getFertilizerById,
    updateFertilizer,
    deleteFertilizer
} = require('../controllers/fertilizerController');

router.post('/', createFertilizer);
router.get('/', getFertilizers);
router.get('/:id', getFertilizerById);
router.put('/:id', updateFertilizer);
router.delete('/:id', deleteFertilizer);

module.exports = router;

const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // Orgânico ou Mineral
    amount: { type: Number, required: true },
    applyDate: { type: Date, required: true }
});

const Fertilizer = mongoose.model('Fertilizer', fertilizerSchema);
module.exports = Fertilizer;

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // Ex: Hortaliças, Frutíferas
    growthPhase: { type: String, required: true }, // Ex: Semente, Crescendo
    season: { type: String, required: true } // Ex: Verão, Inverno
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

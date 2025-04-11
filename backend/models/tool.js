const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    responsible: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Tool = mongoose.model('Tool', toolSchema);

module.exports = Tool;

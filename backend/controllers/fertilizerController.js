const Fertilizer = require('../models/fertilizer');

// Criar fertilizante
exports.createFertilizer = async (req, res) => {
    try {
        const { name, type, amount, applyDate } = req.body;
        const newFertilizer = new Fertilizer({ name, type, amount, applyDate });
        await newFertilizer.save();
        res.status(201).json(newFertilizer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar fertilizantes
exports.getFertilizers = async (req, res) => {
    try {
        const fertilizers = await Fertilizer.find();
        res.status(200).json(fertilizers);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Buscar fertilizante por ID
exports.getFertilizerById = async (req, res) => {
    try {
        const fertilizer = await Fertilizer.findById(req.params.id);
        if (!fertilizer) return res.status(404).json({ message: 'Fertilizante não encontrado' });
        res.status(200).json(fertilizer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar fertilizante
exports.updateFertilizer = async (req, res) => {
    try {
        const updated = await Fertilizer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Fertilizante não encontrado' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Deletar fertilizante
exports.deleteFertilizer = async (req, res) => {
    try {
        const deleted = await Fertilizer.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Fertilizante não encontrado' });
        res.status(200).json({ message: 'Fertilizante excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

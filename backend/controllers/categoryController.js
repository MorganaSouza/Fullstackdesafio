const Category = require('../models/category');

// Criar categoria
exports.createCategory = async (req, res) => {
    try {
        const { name, type, growthPhase, season } = req.body;
        const newCategory = new Category({ name, type, growthPhase, season });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todas as categorias
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Buscar categoria por ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Categoria não encontrada' });
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar categoria
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCategory) return res.status(404).json({ message: 'Categoria não encontrada' });
        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Deletar categoria
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) return res.status(404).json({ message: 'Categoria não encontrada' });
        res.status(200).json({ message: 'Categoria excluída com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

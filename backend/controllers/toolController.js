const Tool = require('../models/tool');

exports.createTool = async (req, res) => {
    try {
        const { name, description, type, responsible } = req.body;
        const tool = new Tool({ name, description, type, responsible });
        await tool.save();
        res.status(201).json(tool);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTools = async (req, res) => {
    try {
        const tools = await Tool.find().populate('responsible', 'name');
        res.status(200).json(tools);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getToolById = async (req, res) => {
    try {
        const tool = await Tool.findById(req.params.id).populate('responsible', 'name');
        if (!tool) return res.status(404).json({ message: 'Ferramenta não encontrada' });
        res.status(200).json(tool);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateTool = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, type, responsible } = req.body;

        const updatedTool = await Tool.findByIdAndUpdate(id, { name, description, type, responsible }, { new: true });
        if (!updatedTool) return res.status(404).json({ message: 'Ferramenta não encontrada' });

        res.status(200).json(updatedTool);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTool = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTool = await Tool.findByIdAndDelete(id);
        if (!deletedTool) return res.status(404).json({ message: 'Ferramenta não encontrada' });

        res.status(200).json({ message: 'Ferramenta excluída com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

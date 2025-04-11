const express = require('express');
const router = express.Router();
const {
    createTool,
    getTools,
    getToolById,
    updateTool,
    deleteTool
} = require('../controllers/toolController');

router.post('/', createTool);
router.get('/', getTools);
router.get('/:id', getToolById);
router.put('/:id', updateTool);
router.delete('/:id', deleteTool);

module.exports = router;

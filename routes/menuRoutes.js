const express = require('express');
const Menu = require('../models/Menu');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// Create a new menu
router.post('/', async (req, res) => {
  try {
    const menu = new Menu(req.body);
    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add item to a menu
router.post('/:menuId/items', async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();

    const menu = await Menu.findById(req.params.menuId);
    menu.items.push(item._id);
    await menu.save();

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all menus with items
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find().populate('items');
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

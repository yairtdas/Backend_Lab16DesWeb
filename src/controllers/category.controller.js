const { Category } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nombre } = req.body;
    const category = await Category.create({ nombre });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
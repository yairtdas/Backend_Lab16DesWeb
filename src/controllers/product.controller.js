const { Product, Category } = require("../models");

// GET /api/products
exports.getAll = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: "category", attributes: ["id", "nombre"] }],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/products/:id
exports.getById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: "category", attributes: ["id", "nombre"] }],
    });
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/products
exports.create = async (req, res) => {
  try {
    const { nombre, precio, descripcion, imageUrl, categoryId } = req.body;
    const product = await Product.create({ nombre, precio, descripcion, imageUrl, categoryId });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /api/products/:id
exports.update = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /api/products/:id
exports.remove = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    await product.destroy();
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
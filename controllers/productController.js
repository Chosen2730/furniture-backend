const Product = require("../models/Products");

const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    await Product.create(newProduct);
    res.status(200).json("product created successfully");
  } catch (error) {
    // console.log({ error, Product });
    res.status(500).json("error creating product");
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAd: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json("error getting products");
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("error getting product");
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).json("Product updated successfully");
  } catch (error) {
    res.status(500).json("error updating product");
    console.log(error);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.id });
    res.status(200).json("Product deleted successfully");
  } catch (error) {
    res.status(500).json("error deleting product");
    console.log(error);
  }
};

const searchProduct = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $search: {
          index: "furniture",
          text: {
            query: req.params.key,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json("error getting products");
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProduct,
  searchProduct,
  updateProduct,
  deleteProduct,
};

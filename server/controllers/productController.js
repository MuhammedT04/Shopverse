const Products = require("../models/products");

const ProductAdd = async (req, res) => {
  try {
    const { Description, Image, Price, ProductName, Stock } = req.body;

   const newProduct = await Products.create({
      ProductName,
      Price,
      Description,
      Image,
      Stock,
    });
    return res.status(200).json({ message: "Product added successfully" ,newProduct});
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Server error while adding product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    return res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const editProduct = async (req, res) => {
  try {
    const { Description, Image, Price, ProductName, Stock, _id } = req.body;

    const updateData = await Products.findOneAndUpdate(
      { _id },
      { $set: { ProductName, Price, Description, Image, Stock } },
      { new: true }
    );

    res.status(200).json({ success: true, product: updateData ,id:_id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const productDelete = async (req, res) => {
  try {
    const { id } = req.params;

     await Products.findOneAndDelete({ _id: id });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  ProductAdd,
  getProducts,
  editProduct,
  productDelete
};

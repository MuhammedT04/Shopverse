const express = require("express");
const { adminLogin } = require("../controllers/authControllers");
const {ProductAdd,getProducts,editProduct,productDelete}= require('../controllers/productController')
const AdminRouter = express.Router();

AdminRouter.post("/login", adminLogin);

AdminRouter.get('/allProduct',getProducts)
AdminRouter.post('/productAdd',ProductAdd)
AdminRouter.put('/edit/:id',editProduct)
AdminRouter.delete('/delete/:id', productDelete);


module.exports = AdminRouter;
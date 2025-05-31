const mongoose = require("mongoose");


const Products = mongoose.Schema({
  ProductName: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Description: {
    type: String
  },
  Image: {
    type: String,
  },
  Stock :{
    type:Number,
    required:true
  }
});
module.exports = mongoose.model("Products", Products);
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
   title: { type: String, required: true },
   img: { type: String },
   price: { type: Number, required: true },
   categories: { type: String, required: true },
   status: { type: Number, required: true },
   details: [{
      size: { type: String },
      quantity: { type: Number }
   }],
},
   { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
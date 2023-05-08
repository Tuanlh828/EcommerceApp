const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
   userId: { type: String, required: true },
   products: [
      {
         productId: {
            type: String,
         },
         quantity: {
            type: Number
         },
      },
   ],
   price: { type: Number, required: true },
   address: { type: Object, required: true },
   status: { type: Number, default: 0 },
},
   { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
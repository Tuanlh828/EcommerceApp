const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
   userId: { type: String, required: true },
   name: { type: String, required: true },
   phone_number:{ type: String, required: true },
   products: [
      {
         productId: {type: String, required: true},
         imgURL: {type: String, required: true},
         quantity: {type: Number, required: true},
         size: {type: String, required: true},
         price: {type: Number, required: true},
      },
   ],
   total_price: { type: Number, required: true },
   delivery_address: { type: String, required: true },
   status: { type: Number, default: 0 },
   // 0: Chờ xử lý
   // 1: Đang vận chuyển
   // 2: Đơn hàng hoàn tất 
   // 3: Đơn hàng rủi ro
},
   { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
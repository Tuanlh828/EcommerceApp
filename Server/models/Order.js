const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
   userId: { type: String, required: true },
   products: [
      {
         productId: {type: String, required: true},
         quantity: {type: Number, required: true},
         size: {type: String, required: true}
      },
   ],
   total_price: { type: Number, required: true },
   delivery_address: { type: String, required: true },
   status: { type: Number, default: 0 },
   // 0: Chờ xác nhận
   // 1: Đã xác nhận
   // 2: Hàng vận chuyển đi
   // 3: Hàng đã giao
   // 4: Đơn hàng hoàn tất or Đơn hàng rủi ro
},
   { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
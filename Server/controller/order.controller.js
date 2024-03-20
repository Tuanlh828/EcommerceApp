const Order = require("../models/Order")

const getAllItem = async(req, res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
   try {
      let orders;
      if (qNew) {
         orders = await Order.find().sort({ createdAt: -1 }).limit(5)
      } else if (qCategory) {
         orders = await Order.find({
            categories: {
               $in: [qCategory],
            }
         })

      } else {
         orders = await Order.find();
      }

      res.render('order', { orders: orders });
   } catch (err) {
      console.log(err)
   }
}

const getOrderByID = async(req,res,next) => {
   try {
      Order.findById(
         {_id: req.params.id}, (err,docs) =>{
            if (err) {
               console.log("Incomplete!!! Cause data have a problem");
               next(err)
            } else {
               res.render("orderDetail", { order: docs });
            }
         }
      )
   } catch (error) {
      res.status(500).json(error.message)
   }
}
module.exports = {getAllItem, getOrderByID};
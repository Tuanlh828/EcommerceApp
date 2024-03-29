const Order = require("../../models/Order");
const {
   verifyToken, verifytokenAndAuthorization,
   verifytokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
   const newOrder = new Order(req.body);

   try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
   } catch (err) {
      res.status(500).json(err);
   }
});

//UPDATE
router.put("/:id", verifytokenAndAdmin, async (req, res) => {
   try {
      const updatedOrder = await Order.findByIdAndUpdate(
         req.params.id,
         {
            $set: req.body,
         },
         { new: true }
      );
      res.status(200).json(updatedOrder);
   } catch (err) {
      res.status(500).json(err);
   }
});

//DELETE
router.delete("/delete/:id", verifytokenAndAdmin, async (req, res) => {
   try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
   } catch (err) {
      res.status(500).json(err);
   }
});

//GET USER ORDERS
router.get("/find/:userId", verifytokenAndAuthorization, async (req, res) => {
   try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders);
   } catch (err) {
      res.status(500).json(err);
   }
});

//GET ALL

router.get("/", verifytokenAndAdmin, async (req, res) => {
   try {
      const orders = await Order.find();
      res.status(200).json(orders);
   } catch (err) {
      res.status(500).json(err);
   }
});

// GET MONTHLY INCOME

router.get("/income",verifyToken, async (req, res) => {
   const date = new Date();
   const monthIncome = new Date(date.setMonth(date.getMonth() - 1));
   const monthlyIncome = new Date(date.setMonth(date.getMonth() - 11));

   try {
      const income = await Order.aggregate([
         { $match: { createdAt: { $gte: monthlyIncome } } },
         {
            $project: {
               month: { $month: "$createdAt" },
               sales: "$total_price",
            },
         },
         {
            $group: {
               _id: "$month",
               total: { $sum: "$sales" },
            },
         },
      ]);
      res.status(200).json(income);
   } catch (err) {
      res.status(500)
   }
});

module.exports = router;
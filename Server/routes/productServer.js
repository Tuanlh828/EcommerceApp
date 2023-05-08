var express = require('express');
var router = express.Router();
const Product = require('../models/Product')
const multer = require('multer');
const { DES } = require('crypto-js');
const { validateToken } = require('../controller/userAuth.controller')
/**
 * @description UPLOAD IMAGE URL
 */
// Storage setting:
let urlImage;
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      if (file.mimetype === "image/jpeg" ||
         file.mimetype === "image/jpg" ||
         file.mimetype === "image/png") {
         cb(null, 'uploads/images');
      } else {
         cb(new Error('Cannot found image'), false);
      }
   },
   filename: (req, file, cb) => {
      // cb(null, file.originalname);
      urlImage = file.fieldname + "_" + Date.now() + "_" + file.originalname;
      cb(null, urlImage);
   }
})
const upload = multer({ storage: storage });

/**
 * @description getAllProducts
 * @method GET /getAllProducts
 */
router.get('/product', async (req, res) => {
   const qNew = req.query.new;
   const qCategory = req.query.category;
   try {
      let products;
      if (qNew) {
         products = await Product.find().sort({ createdAt: -1 }).limit(5)
      } else if (qCategory) {
         products = await Product.find({
            categories: {
               $in: [qCategory],
            }
         })

      } else {
         products = await Product.find();
      }

      res.render('product', { product: products });
      console.log(products);
   } catch (err) {
      console.log(err)
   }
});

/**
 * @description create
 * @method POST /create
 */
router.post("/add-product", upload.single("myFile"), async (req, res, next) => {
   try {
      const product = new Product({
         title: req.body.title,
         img: req.file.filename,
         price: req.body.price,
         categories: req.body.categories,
         status: 0,
         details: JSON.parse(req.body.details),
      });
      product.save((err) => {

         if (err) {
            res.json({ message: err.message, type: 'error' });
         } else {
            res.status(200).redirect("product");
         }
      });

   } catch (err) {
      res.status(500).json(err.message)
   }
})

/**
 * @description Show update element
 * @method 
 */
router.get("/product/:id", (req, res, next) => {
   try {
      Product.findOneAndUpdate(
         { _id: req.params.id, },
         req.body, { new: true }, (err, docs) => {
            if (err) {
               console.log("Incomplete!!! Cause data have a problem");
               next(err)
            } else {
               res.status(200).render("edit", { product: docs });
            }
         }
      )
   } catch (error) {
      res.status(500).json(err.message)
   }

   // try {
   //    const updatedProduct = await Product.findByIdAndUpdate(
   //       req.params.id, {
   //       $set: req.body
   //    }, { new: true });
   //    res.status(200).json(updatedProduct);
   // } catch (err) {
   //    res.status(500).json(err);
   // }
});

router.post('/update/:id', (req, res, next) => {
   Product.updateOne(
      { _id: req.params.id }, {
      title: req.body.title,
      price: req.body.price,
      categories: req.body.categories,
      status: req.body.status,
      $currentDate: { lastModified: true }
   },
      { new: true }, (err, docs) => {
         if (err) {
            console.log("Incomplete! Cause data have a problem");
            next(err)
         } else {
            res.status(200).redirect("/product")
         }
      })
})

router.post('/update-details/:id', (req, res, next) => {
   Product.findOneAndUpdate(
      { _id: req.params.id, "details.size": req.body.newSize }, {
      $set: {
         "details.$.quantity": req.body.newQuantity
      },
      $currentDate: { lastModified: true }
   },
      { new: true }, (err, docs) => {
         if (err) {
            console.log("Incomplete! Cause data have a problem");
            next(err)
         } else {
            res.status(200).redirect("/product")
         }
      })
})
module.exports = router;

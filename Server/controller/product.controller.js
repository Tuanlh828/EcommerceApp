const { json } = require("express");
const Product = require("../models/Product")
const multer = require('multer');

const page = async (req, res, next) => {
   res.redirect('product');
}
/**
 * @description UPLOAD IMAGE URL
 */
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

const getAllProduct = async(req, res)=>{
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
   } catch (err) {
      console.log(err)
   }
}
/**
 * @description createProduct
 */
const createProduct = async(req,res) => {

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
}

const getProductById = async (req,res, next) =>{
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
        res.status(500).json(error.message)
     }
}

const getDataJSONByID = async (req,res, next) =>{
   try {
       Product.findOne(
          { _id: req.params.id, }, (err, docs) => {
             if (err) {
                console.log("Incomplete!!! Cause data have a problem");
                next(err)
             } else {
                res.status(200).json(docs)
             }
          }
       )
    } catch (error) {
       res.status(500).json(error.message)
    }
}

const updateProduct = async(req,res,next)=>{
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
        });


}

const updateDetails = async(req,res,next)=>{
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
}

module.exports = {getAllProduct, createProduct, getProductById,updateProduct,updateDetails, getDataJSONByID, page};
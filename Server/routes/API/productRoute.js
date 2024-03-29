const router = require("express").Router()
const { verifyToken, verifytokenAndAuthorization, verifytokenAndAdmin } = require("./verifyToken");
const Product = require('../../models/Product')

/**
 * @description create
 * @method POST /create
 */
router.post("/", verifytokenAndAdmin, async (req, res) => {
   const newProduct = new Product(req.body)

   try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
   } catch (err) {
      res.status(500).json(err)
   }
})

/**
 * @description data user
 * @method GET /user/_id
 */


/**
 * @description update
 * @method PUT /update
 */
router.put("/update", verifytokenAndAdmin, async (req, res) => {
   try {
      const updatedProduct = await Product.findByIdAndUpdate(
         req.params.id, {
         $set: req.body
      }, { new: true });
      res.status(200).json(updatedProduct);
   } catch (err) {
      res.status(500).json(err);
   }
});

/**
 * @description delete by id
 * @method DELETE /:id
 */
router.delete('/:id', verifytokenAndAdmin, async (req, res) => {
   try {
      await Product.findByIdAndDelete(req.params.id)
      res.status(200).json('Product has been deleted...');
   } catch (err) {
      res.status(500).json(err);
   }
});

/**
 * @description get product by id
 * @method GET /find/:id
 */
router.get('/find/:id', async (req, res) => {
   try {
      const product = await Product.findById(req.params.id)

      res.status(200).json(product)
   } catch (err) {
      res.status(500).json(err);
   }
});

/**
 * @description getAllProducts
 * @method GET /getAllProducts
 */
router.get('/', async (req, res) => {
   const qNew = req.query.new;
   const qCategory = req.query.category;
   try {
      let products;
      if (qNew) {
         products = await Product.find()
         // products = await Product.find().sort({ createdAt: -1 }).limit(5)
      } else if (qCategory) {
         products = await Product.find({
            categories: {
               $in: [qCategory],
            }
         })
      } else {
         products = await Product.find();
      }


      res.status(200).json(products)
   } catch (err) {
      res.status(500).json(err);
   }
});


module.exports = router;
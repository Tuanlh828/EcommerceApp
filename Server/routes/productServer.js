var express = require('express');
var router = express.Router();
const { getAllProduct,
   createProduct,
   getProductById,
   updateProduct,
   updateDetails, } = require('../controller/product.controller')
const { cookieJwtAuth } = require('../controller/userAuth.controller')
const multer = require('multer');
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
router.get('/product', getAllProduct);

/**
 * @description create
 */
router.post("/add-product",upload.single("myFile"), createProduct);

/**
 * @description getProductbyId
 */
router.get("/product/:id", getProductById);

/**
 * @description update
 */
router.post('/update/:id', updateProduct)

router.post('/update-details/:id', updateDetails)
module.exports = router;

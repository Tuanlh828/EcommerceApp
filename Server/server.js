const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const { errorHandler, notFound } = require("./Middleware/Error")

require('dotenv').config({ path: '.env' });
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 5000
dotenv.config();

app.use(cookieParser());
app.use(morgan('tiny'));
app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());

//  view engine setup
app.set("view engine", "ejs");
app.set("views","./views");

app.use('/views', express.static('views'));

// load routes - SERVER
const productServer = require('./routes/productServer');

// load routes - API
const userRoute = require('./routes/userRoute');
const dashboardServer = require('./routes/dashboardServer');


const authAPI = require('./routes/API/authRoute');
const productAPI = require('./routes/API/productRoute');
const cartAPI = require('./routes/API/cartRoute');
const orderAPI = require('./routes/API/orderRoute');

// set routes
app.use("/", userRoute);
app.use("/api", authAPI);
app.use("/api/products", productAPI);
app.use("/api/carts", cartAPI);
app.use("/api/orders", orderAPI);
// app.use(notFound);
// app.use(errorHandler);

app.use("/", productServer);
app.use("/", dashboardServer);
mongoose.connect(process.env.MONGO_URL)
   .then(() => console.log("DBConnection Successfull!"))
   .catch((err) => {
      console.log(err)
   });

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });
// test
app.get("/", (req, res) => {
   res.render("login", { success: true });
});




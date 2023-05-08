const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const User = require('../models/User')

//@desc Register a user
//@route POST /register
//@access public
const registerUser = async (req, res, next) => {
   const { username, email, password } = req.body;
   if (!username || !email || !password) {
      res.status(400);
      throw new Error('All fields are mandatory!');
   }
   const userAvailable = await User.findOne({ email });
   if (userAvailable) {
      res.status(400);
      throw new Error('User already registered!');
   }

   //HASH PASSWORD
   const hashedPassword = await bcrypt.hash(password, 10);
   console.log("Hashed Password: ", hashedPassword);
   const user = await User.create({
      username,
      email,
      password: hashedPassword,
   });

   console.log(`User created ${user}`);
   if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
   } else {
      res.status(400);
      throw new Error('User data us not valid');
   }
};

//@desc Login a user
//@route POST /login
//@access public
const loginUser = async (req, res, next) => {
   const { email, password } = req.body;
   if (!email || !password) {
      res.status(400);
   }
   const user = await User.findOne({ email });
   if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign({
         user: {
            username: user.username,
            email: user.email,
            id: user.id,
         }
      }, process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: 30 });
      res.cookie("token", accessToken, { httpOnly: true })
      return res.redirect('/dashboard');

      // .send({
      //    user: {
      //       id: user._id,
      //       email: user.email,
      //    },
      //    message: "Login successfull",
      //    accessToken: accessToken,
      // });

      // res.redirect('/dashboard')
   } else {
      res.render('login', { success: false });
   }
};

const validateToken = async (req, res, next) => {
   let token = req.params.token; let authHeader = req.headers.Authorization || req.headers.authorization;
   if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1]; jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {

         if (err) {
            res.status(401).json(err);
            throw new Error("User is not authorized");
         }
         req.user = decoded.user;
         next();
      });

      if (!token) {
         res.status(401).json("User is not authorized or token is missing");
         throw new Error("User is not authorized or token is missing");
      }
   }
}

//@desc Current a user
//@route GET /current
//@access private
const currentUser = async (req, res, next) => {
   res.json(req.user)
};

//@desc Authorization -- Cấp quyền
const cookieJwtAuth = (req, res, next) => {
   const token = req.cookies.token;
   try {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      req.user = user;
      next();
   } catch (error) {
      res.clearCookie("token");
      return res.redirect("/");
   }
}



module.exports = { registerUser, loginUser, currentUser, validateToken, cookieJwtAuth };


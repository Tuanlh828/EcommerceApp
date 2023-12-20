const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const User = require('../models/User')

//@desc Register a user
//@route POST /register
//@access public
const registerUser = async (req, res, next) => {
   const { username, email, password } = req.body;
   const hashedPassword = await bcrypt.hash(password, 10);

   const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
   });

   await User.findOne({ email: email })
      .then(
         async (savedUser) => {
            if (savedUser) {
               return res.status(422).send({ error: "The email has already been used" });
            }
            try {
               await newUser.save()
               res.send({ message: "User saved successfully" });
            } catch (error) {
               console.log("db err", error);
               return res.status(422).send({ error: error.message });
            }
         }
      )
};

//@desc Login a user
//@route POST /login
//@access public
const loginUser = async (req, res, next) => {
   const { email, password } = req.body;
   if (!email || !password) {
      res.status(400);
   }
   const user = await User.findOne({ where: { email } }).catch(
      (err) => {
         console.log("Error", err);
      }
   );

   // kiểm tra thông tin đăng nhập
   if (user && (await bcrypt.compare(password, user.password)) && user.isAdmin == true) {
      const accessToken = jwt.sign({
         user: {
            username: user.username,
            email: user.email,
            id: user.id,
         }
      }, process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: '24h' });
      res.cookie("token", accessToken, { httpOnly: true })
      return res.redirect('/dashboard');
   
      // nếu ko phải là quản trị viên
   } else if (user.isAdmin !== true) {
      res.render('login');
   }
   else {
      res.render('login');
   };
}
// const validateToken = async (req, res, next) => {
//    let token = req.params.token; let authHeader = req.headers.Authorization || req.headers.authorization;
//    if (authHeader && authHeader.startsWith('Bearer')) {
//       token = authHeader.split(' ')[1]; jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {

//          if (err) {
//             res.status(401).json(err);
//             throw new Error("User is not authorized");
//          }
//          req.user = decoded.user;
//          next();
//       });

//       if (!token) {
//          res.status(401).json("User is not authorized or token is missing");
//          throw new Error("User is not authorized or token is missing");
//       }
//    }
// }

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

module.exports = { registerUser, loginUser, currentUser,  cookieJwtAuth };


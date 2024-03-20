const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//@desc Register a user
//@route POST /register
//@access public
const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  await User.findOne({ email: email }).then(async (savedUser) => {
    if (savedUser) {
      return res.status(422).send({ error: "The email has already been used" });
    }
    try {
      await newUser.save();
      res.send({ message: "User saved successfully" });
    } catch (error) {
      console.log("db err", error);
      return res.status(422).send({ error: error.message });
    }
  });
};

//@desc Login a user
//@route POST /login
//@access public
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
  }
  const user = await User.findOne({ email: email }).catch((err) => {
    console.log("Error", err);
  });

  // kiểm tra thông tin đăng nhập
  if (
    user &&
    (await bcrypt.compare(password, user.password)) &&
    user.isAdmin == true
  ) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );
    res.cookie("token", accessToken, { httpOnly: true });
    res.render("dashboard");

    // nếu ko phải là quản trị viên
  } else if (typeof user.isAdmin == false) {
    res.status(401).render("login", { success: false });
    console.log(user);
  } else {
    res.status(401).render("login", { success: false });
  }
};

const getUserById = async (req,res, next) =>{
  try {
      User.findOne(
         { _id: req.params.id, }, (err, docs) => {
            if (err) {
               console.log("Incomplete!!! Cause data have a problem");
               next(err)
            } else {
               res.status(200).json(
                {data:
                  {
                    username: docs["username"],
                    phone_number: docs["phone_number"]
                  }
                }
              );
            }
         }
      )
   } catch (error) {
      res.status(500).json(error.message)
   }
}

//@desc Current a user
//@route GET /current
//@access private
const currentUser = async (req, res, next) => {
  res.json(req.user);
};

//@desc Authorization -- Cấp quyền
const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};

module.exports = { registerUser, loginUser, currentUser, cookieJwtAuth, getUserById };

const router = require("express").Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
//REGISTER 

router.post('/register', async (req, res) => {
   const { username, email, password } = req.body;
   const hashedPassword = await bcrypt.hash(password, 10);

   const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
   });

   User.findOne({ email: email })
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

   // try {
   //    const savedUser = await newUser.save();
   //    return res.status(201).json(savedUser);
   // } catch (err) {
   //    res.status(500).json(err);
   // }
});



//LOGIN 
router.post("/login", async (req, res) => {
   const { email, password } = req.body;

   const userWithEmail = await User.findOne({ where: { email } })
      .catch((err) => {
         console.log("Error:" + err);
      });
   if (!userWithEmail) {
      return res
         .status(400)
         .json({ message: "Email or password does not match!2" });
   }
   const validPassword = await bcrypt.compare(password, userWithEmail.password,);
   console.log(validPassword);
   if (!validPassword) {
      return res
         .status(400)
         .json({ message: "Email or password does not match!" });
   }

   const jwtToken = jwt.sign(
      { id: userWithEmail.id, email: userWithEmail.email },
      process.env.ACCESS_TOKEN_SECRET
   );
   res.json({ message: "Welcome Back!", token: jwtToken });
})
module.exports = router;
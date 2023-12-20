const router = require("express").Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
//REGISTER 

router.post('/register', async (req, res) => {
   const { username, email, password } = req.body;
   var validRegex = /^.+\@.+\..+$/;
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
               return res.status(422).json("Email already used");
            } else if (req.body.username == '' || req.body.email == '' || req.body.password == '') {
               return res.status(400).json("Please fill in the input text")
            } else if (!validRegex.test(req.body.email)) {
               return res.status(400).json("Invalid email")
            }
            try {
               await newUser.save()
               res.send("User saved successfully");
            } catch (error) {
               console.log("db err", error.message);
               return res.status(422).json(error);
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
         .json({ message: "Email or password does not match!" });
   }
   const validPassword = await bcrypt.compare(password, userWithEmail.password);
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
   res.json({ message: "Success", token: jwtToken, user_id: userWithEmail.id, status: 200 });
})
module.exports = router;
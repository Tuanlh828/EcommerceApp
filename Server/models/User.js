const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   username: {
      type: String, required: 'please enter your username', trim: true
   },
   email: {
      type: String,
      required: 'please enter your email',
      unique: [true, "Email address already taken"],

   },
   password: { type: String, required: [true, 'please enter your password'] },
   isAdmin: {
      type: Boolean,
      default: false,
   },
},
   { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
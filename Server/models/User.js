const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   username: { type: String, required: [true, "name required"] },
   email: {
      type: String,
      required: [true, 'Vui lòng điền email'],
      unique: [true, "Email đã được sử dụng"],
      match: [/^.+\@.+\..+$/, "Vui lòng nhập đúng định dạng email"]
   },
   password: { type: String, required: true },
   isAdmin: {
      type: Boolean,
      default: false,
   },
},
   { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
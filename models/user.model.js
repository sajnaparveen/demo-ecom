const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    uuid: { type: String, required: false },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre('save',function(next){
//     next();
// })

module.exports = mongoose.model("users", userSchema, "Users");

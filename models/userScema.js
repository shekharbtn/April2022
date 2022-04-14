const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    mobile: {
      type: Number,
      unique: true,
      minlength: 10,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);

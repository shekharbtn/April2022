const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
      unique: true,
      minlength: 10,
    },
    description: {
      type: String,
    },
    featuredImage: {
      type: String,
    },
    blogId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", blogSchema);

const Blog = require("../models/blogScema");
const { v4 } = require("uuid");

class blogService {
  createBlog = async ({ userId, title, description, photo }) => {
    try {
      if (!title.length) {
        throw {
          message: "Title required",
          status: 400,
        };
      }
      if (!description.length) {
        throw {
          message: "Description required",
          status: 400,
        };
      }
      if (!photo.length) {
        throw {
          message: "photo required",
          status: 400,
        };
      }
      const isTitle = await Blog.find({ title });
      if (isTitle.length) {
        throw {
          message: "Title must be unique",
        };
      }

      const createBlog = await Blog.create({
        userId: userId,
        title,
        description,
        featuredImage: photo,
        blogId: v4(),
      });
      return {
        message: "Blog added successfully",
        error: false,
        status: 201,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status || 400,
        error: true,
      };
    }
  };
  updateBlog = async (newData) => {
    try {
      if (
        !newData.title &&
        !newData.description &&
        !newData.photo &&
        !newData.userId
      ) {
        throw {
          message: "All field are required to update",
          status: 400,
        };
      }
      const isBlog = await Blog.find({ userId: newData.userId });
      if (!isBlog.length) {
        throw {
          message: "Blog ID does not exist",
          status: 400,
        };
      }

      const updateBlog = await Blog.updateOne(
        { userId: newData.userId },
        {
          title: newData.title,
          description: newData.description,
          featuredImage: newData.photo,
        }
      );
      return {
        message: "Blog updated successfully",
        status: 200,
        error: false,
      };
    } catch (error) {
      return {
        message: error.message,
        error: true,
        status: error.status || 400,
      };
    }
  };

  deleteBlog = async ({ id }) => {
    try {
      if (!id.length) {
        throw {
          message: "ID required to delete blog",
          status: 400,
        };
      }

      const deleteBlog = await Blog.findOneAndDelete({ blogId: id });
      if (deleteBlog === null) {
        throw {
          message: "Requested blog not found using given ID",
          status: 400,
        };
      }

      return {
        message: "Blog deleted successfully",
        status: 200,
        error: false,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status || 400,
        error: true,
      };
    }
  };
  getBlog = async (id) => {
    try {
      if (!id.length) {
        throw {
          message: "Id is required",
          status: 400,
        };
      }

      const getBlogById = await Blog.find({ blogId: id });
      console.log(getBlogById);

      if (!getBlogById.length) {
        throw {
          message: "ID does not exit",
          status: 400,
        };
      }

      return {
        message: "Blog found",
        status: 200,
        error: false,
        data: getBlogById,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status || 400,
        error: true,
      };
    }
  };
}

module.exports = new blogService();

const blogService = require("../../services/blogService");
const { v4 } = require("uuid");

class BlogController {
  createBlog = async (req, res) => {
    try {
      const { title, description, photo } = req.body;
      const userId = "jlkajfkljala" || req.userId;

      const getRes = await blogService.createBlog({
        title,
        description,
        photo,
        userId,
      });
      if (getRes.error) {
        throw getRes;
      }
      return res.status(getRes.status || 400).send({
        message: getRes.message,
        error: getRes.error,
      });
    } catch (error) {
      return res.status(error.status || 400).send({
        message: error.message,
        error: error.error,
      });
    }
  };

  updateBlog = async (req, res) => {
    try {
      const userId = "jlkajfkljala" || req.userId;
      const getRes = await blogService.updateBlog({ ...req.body, userId });

      if (getRes.error) {
        throw getRes;
      }
      return res.status(getRes.status || 400).send({
        message: getRes.message,
        error: getRes.error,
      });
    } catch (error) {
      return res.status(error.status).send({
        message: error.message,
        status: error.status || 400,
        error: error.error,
      });
    }
  };

  deleteBlog = async (req, res) => {
    try {
      const { id } = req.body;
      const getRes = await blogService.deleteBlog({ id });
      if (getRes.error) {
        throw getRes;
      }
      return res.status(getRes.status).send({
        message: getRes.message,
        error: getRes.error,
      });
    } catch (error) {
      return res.status(error.status).send({
        message: error.message,
        status: error.status || 400,
        error: error.error,
      });
    }
  };

  getBlogById = async (req, res) => {
    try {
      const id = req.params.id;
      const getRes = await blogService.getBlog(id);
      if (getRes.error) {
        throw getRes;
      }
      return res.status(getRes.status || 400).send({
        message: getRes.message,
        error: getRes.error,
        data: getRes.data,
      });
    } catch (error) {
      return res.status(error.status || 400).send({
        message: error.message,
        error: error.error,
      });
    }
  };
}

module.exports = new BlogController();

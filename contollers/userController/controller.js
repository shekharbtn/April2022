const UserService = require("../../services/userService");

class UserController {
  register = async (req, res) => {
    const { name, email, password, mobile } = req.body;
    const getRes = await UserService.register({
      name,
      email,
      password,
      mobile,
    });
    return res.status(getRes.status).send({
      message: getRes.message,
      error: getRes.error,
    });
  };
  login = async (req, res) => {
    const { email, password } = req.body;
    const getRes = await UserService.login({ email, password });
    return res.status(getRes.status).send({
      message: getRes.message,
      error: getRes.error,
      data: getRes.data,
    });
  };

  findById = async (req, res) => {
    const id = req.params.id;
    const getRes = await UserService.findById(id);
    return res.status(getRes.status).send({
      message: getRes.message,
      error: getRes.error,
      data: getRes.data,
    });
  };

  updateUser = async (req, res) => {
    const { name, email, mobile } = req.body;
    const getRes = await UserService.updateUser({ name, email, mobile });
    return res.status(getRes.status).send({
      message: getRes.message,
      error: getRes.error || 400,
      data: getRes.data,
    });
  };

  deleteUser = async (req, res) => {
    const { email } = req.body;
    const getRes = await UserService.deleteUser({ email });
    return res.status(getRes.status).send({
      message: getRes.message,
      error: getRes.error || 400,
    });
  };

  getUserByEmail = async (req, res) => {
    try {
      const { email } = req.body;
      const getRes = await UserService.getUserByEmail({ email });
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

module.exports = new UserController();

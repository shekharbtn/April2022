const Users = require("../models/userScema");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("../middlewares/jwtValidation");

class UserService {
  register = async ({ name, email, password, mobile }) => {
    try {
      if (!name.length) {
        throw {
          message: "Name required",
          status: 400,
        };
      }
      if (!email.length) {
        throw {
          message: "Email required",
          status: 400,
        };
      }
      if (!password.length) {
        throw {
          message: "Password required",
          status: 400,
        };
      }
      if (mobile.toString().length != 10) {
        throw {
          message: "Mobile no must be 10 digit",
          status: 400,
        };
      }

      const findUser = await Users.findOne({ email });
      if (findUser) {
        throw {
          message: "User already registered",
          status: 400,
        };
      }

      const hassPassword = await bcrypt.hash(password, 10);

      const registerUser = await Users.create({
        name,
        email,
        password: hassPassword,
        mobile,
      });

      return {
        message: "User registered successfully",
        status: 201,
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

  login = async ({ email, password }) => {
    try {
      if (!email.length) {
        throw {
          message: "Email required",
          status: 400,
        };
      }
      if (!password.length) {
        throw {
          message: "Password required",
          status: 400,
        };
      }

      const isEmail = await Users.findOne({ email });
      if (!isEmail) {
        throw {
          message: "No user found",
          status: 400,
        };
      }

      const isValidPassword = await bcrypt.compare(password, isEmail.password);

      if (!isValidPassword) {
        throw {
          message: "Incorrect Passowrd",
          status: 400,
        };
      }
      const token = jwt.generateToken(isEmail._id);

      return {
        message: "User login successful",
        status: 200,
        error: false,
        data: { token: token },
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
      };
    }
  };
  findById = async (id) => {
    try {
      const isUser = await Users.findById({ _id: id }).catch(() => {
        throw {
          message: "Invalid",
          status: 400,
        };
      });

      if (!isUser) {
        throw {
          message: "Invalid ID",
          status: 400,
        };
      }

      return {
        message: "User ID found successfully",
        status: 200,
        error: false,
        data: isUser,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status || 400,
        error: true,
      };
    }
  };
  updateUser = async ({ name, email, mobile }) => {
    try {
      console.log(name, email, mobile);
      if (!name.length) {
        throw {
          message: "Name Required",
          status: 400,
        };
      }
      if (!email.length) {
        throw {
          message: "email required",
          status: 400,
        };
      }
      if (mobile.toString().length != 10) {
        throw {
          message: "Number must be 10 digit",
        };
      }

      const updateUser = await Users.updateOne(
        { email },
        { name, mobile }
      ).catch(() => {
        throw {
          message: "Invalid Email",
          status: 400,
        };
      });

      if (!updateUser) {
        throw {
          message: "Invalid Email",
          status: 400,
        };
      }

      return {
        message: "User updated successfully",
        status: 200,
        error: false,
        data: updateUser,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: true,
      };
    }
  };
  deleteUser = async ({ email }) => {
    try {
      if (!email.length) {
        throw {
          message: "Email address is required",
        };
      }

      const deleteUser = await Users.findOneAndDelete({ email }).catch(() => {
        throw {
          message: "Invalid email id or not registered",
          status: 400,
        };
      });

      if (deleteUser === null) {
        throw {
          message: "Invalid email id or not registered",
          status: 400,
        };
      }

      return {
        message: "User deleted successfully",
        status: 200,
        error: false,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: true,
      };
    }
  };
  getUserByEmail = async ({ email }) => {
    try {
      if (!email.length || !email) {
        throw {
          message: "Email required",
          status: 400,
        };
      }
      const findUser = await Users.find({ email });
      if (findUser.length == 0) {
        throw {
          message: "User not found",
          status: 400,
        };
      }

      return {
        message: "User found successfully",
        status: 200,
        error: false,
        data: findUser,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: true,
      };
    }
  };
}
module.exports = new UserService();

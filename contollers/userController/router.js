const router = require("express").Router();
const userController = require("./controller");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getbyid/:id", userController.findById);
router.patch("/update", userController.updateUser);
router.delete("/delete", userController.deleteUser);
router.get("/getuserbyemail", userController.getUserByEmail);

module.exports = router;

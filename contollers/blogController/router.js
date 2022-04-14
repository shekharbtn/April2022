const blogController = require("./blogController");
const router = require("express").Router();

router.post("/create", blogController.createBlog);
router.patch("/updateBlog", blogController.updateBlog);
router.delete("/delete", blogController.deleteBlog);
router.get("/:id", blogController.getBlogById);

module.exports = router;

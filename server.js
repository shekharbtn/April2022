require("dotenv").config();
const app = require("./app");
require("./config/dbConnection");
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listing on ${PORT}...`);
});

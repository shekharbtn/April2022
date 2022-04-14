const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log(`DB Connected successfully`);
  })
  .catch((err) => {
    console.log(`DB Connection error`, err);
  });

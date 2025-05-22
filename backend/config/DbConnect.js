const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log(`DataBase connection successfully`);
  } catch (error) {
    console.log(`Error while connecting to DataBase`, error);
  }
};
module.exports = dbConnect;

const mongoose = require("mongoose");
require("dotenv").config();

// connection to db
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  
  db.once("open", function () {
    console.log("MongoDB connection successful!");
  });
  
  module.exports = db;

//dependencies
const express = require("express");
require("dotenv").config();
const db = require('./config/connection');

//iniitialize express app
const app = express();
console.log("port functions correctly")
const PORT = process.env.PORT || 3001;

//initializes routes
const thoughtControllerRoute = require("./controllers/thought");
const userControllerRoute = require("./controllers/user");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/thoughts", thoughtControllerRoute);
app.use("/api/users", userControllerRoute);

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Server is now listening on port ${PORT}, yay: `);
      });
})

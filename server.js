//dependencies
const express = require("express");
require("dotenv").config();
const db = require('./config/connection');

//iniitialize express app
const app = express();
console.log("port functions correctly")
const PORT = process.env.PORT || 3001;

//initializes routes
const thoughtRoutes = require("./routes/api/thoughtRoutes");
const userRoutes = require("./routes/api/userRoutes");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("api/thoughts", thoughtRoutes);
app.use("/api/users", userRoutes);

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Server is now listening on port ${PORT}, yay: `);
      });
})

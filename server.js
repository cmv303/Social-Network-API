//dependencies
const express = require("express");
require("dotenv").config();
const db = require('./config/connection');

//iniitialize express app
const app = express();
const PORT = process.env.PORT || 3001;

//initializes routes
const routes = require("./controllers");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Server is now listening on port ${PORT}, yay: `);
      });
})

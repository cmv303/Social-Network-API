//dependencies
const path = require("path");
const express = require("express");
require("dotenv").config();

//iniitialize express app
const app = express();
const PORT = process.env.PORT || 3001;

//initializes routes
const routes = require("./controllers");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}, yay: `);
});
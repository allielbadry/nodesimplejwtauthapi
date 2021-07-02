const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

require("dotenv").config();

const app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require("./config/database");

// Must first load the models
require("./models/userModel");

// Pass the global passport object into the configuration function
require("./config/passport")(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Allows our Front-End application to make HTTP requests to Express application
app.use(cors());

// Imports all of the routes from ./routes/index.js
app.use(require("./routes"));

// Server listens
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const mongoose = require("mongoose");

// set mongoose db settings
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

if (process.env.NODE_ENV === "dev") {
  // dev env
  mongoose.connect(process.env.DB_DEV_URI);

  mongoose.connection.once("connect", () => {
    console.log("DB IS CONNECT");
  });
} else if (process.env.NODE_ENV == "production") {
  // production env
  mongoose.connect(process.env.DB_PRODUCTION_URI);

  mongoose.connection.once("connect", () => {
    console.log("DB IS CONNECT");
  });
}

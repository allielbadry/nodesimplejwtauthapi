const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

if (process.env.NODE_ENV === "dev") {
  mongoose.connect(process.env.DB_DEV_URI);

  mongoose.connection.once("connect", () => {
    console.log("DB IS CONNECT");
  });
} else if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.DB_URI);

  mongoose.connection.once("connect", () => {
    console.log("DB IS CONNECT");
  });
}

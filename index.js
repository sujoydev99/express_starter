// imports

const express = require("express");
const cors = require("cors");
const config = require("config");
const mongoose = require("mongoose");
const logger = require("morgan");
// const dotenv = require("dotenv");
// dotenv.config();
// middlewares
const auth = require("./middlewares/auth");
const error = require("./middlewares/error");

const Auth = require("./routes/api/Auth");
const Media = require("./routes/api/Media");
const Projects = require("./routes/api/Projects");
const Public = require("./routes/api/Public");
// initialize express app
app = express();
// bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors
app.use(cors());

// logger
app.use(logger("common"));

// health check route
app.get("/", (req, res) =>
  res.status(200).json({
    status: 200,
    message: "Health check successful",
  })
);
// routes
app.use("/api/v1/auth", Auth);
// app.use("/api/v1/<...>", auth, Media);

// error handling middleware
app.use(error);

// set up port for running server
const port = config.get("PORT");
console.log(process.env.NODE_ENV);

const mongoURI = config.get("mongoURI");
// mongoDB connect
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// start app on port = PORT if connected to mongodb
mongoose.connection.on("connected", () => {
  app.listen(port, () =>
    console.log(`Server is listening at http://localhost:${port}`)
  );
});

mongoose.connection.on("error", (err) => {
  console.log("ERROR: mongoDB connection error", err);
});

mongoose.connection.on("disconnected", (err) => {
  console.log("INFO: mongoDB connection error", err);
});

// close mongo connection on shutdown
process.on("SIGINT", () => {
  mongoose.connection.close(function () {
    console.log("App terminated!! Mongo connection closed");
    process.exit(0);
  });
});

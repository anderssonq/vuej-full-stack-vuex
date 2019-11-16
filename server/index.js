const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const { mongoose } = require("./routes/api/database");
const morgan = require("morgan");
app.use(morgan("dev"));

//Middleware
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (request, response) => {
  response.json({ infoServer: "Node.js, Express and MongoDB Server" });
});


//Routers ApiRest
app.use("/api/posts", require("./routes/api/posts.route"));
app.use("/api/user", require("./routes/api/users.route"));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));

const express = require("express");
const recipes = require("./src/router/recipes");
const category = require("./src/router/category");
const users = require("./src/router/users");


const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = 3000;

const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.json({ message: "success", data: "server success running on port 3000" });
});

app.use('/recipes', recipes)
app.use('/category', category)
app.use('/users', users)


app.listen(port, () => {
  console.log("app running on port 3000");
});

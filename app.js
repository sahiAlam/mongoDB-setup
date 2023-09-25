const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("pages/home");
});

// app.post("/", (req, res) => {
//     const formData = req.body;
//     console.log(formData)
//     res.redirect("/");
// });

// database
const url = "mongodb://localhost:27017/subscribeDB";
mongoose.set("strictQuery", true);
mongoose
  .connect(url)
  .then(() => {
    console.log("database connected..");
  })
  .catch((err) => {
    console.log(err);
  });

// schema
const userSchema = mongoose.Schema({
  username: String,
  gmail: String,
});

// model
const Users = mongoose.model("User", userSchema);

app.post("/", (req, res) => {
  const formData = req.body;
  Users.insertOne(formData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
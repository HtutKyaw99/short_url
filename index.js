const express = require("express");
const mongoose = require("mongoose");

const ShortURL = require("./models/ShortURL");

const app = express();

const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.set("views", "./views");

mongoose.connect("mongodb://localhost:27017/shortURL", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", async (req, res) => {
  const shortLink = await ShortURL.find();
  console.log(shortLink);
  res.render("index", { shortLink: shortLink });
});

app.post("/shortUrls", async (req, res) => {
  await ShortURL.create({ fullLink: req.body.full });
  res.redirect("/");
});

app.get("/:short", async (req, res) => {
  const link = await ShortURL.findOne({ shortLink: req.params.short });
  if (link == null) return res.sendStatus(400);
  res.redirect(link.fullLink);
});

app.listen(PORT, () => {
  console.log("Server is running");
});

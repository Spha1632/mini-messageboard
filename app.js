const express = require("express");
const path = require("node:path");
const addNewRouter = require("./routes/addNewRouter");
const openUserRouter = require("./routes/openUserRouter");
const { loadMessages, loadMessagebyID } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;
const assetsPath = path.join(__dirname, "public");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

let messages = [
  {
    message: "Hi there!",
    username: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.use("/new", addNewRouter(messages));
app.use("/open", openUserRouter());

app.get("/", async (req, res) => {

  messages = await loadMessages();
  res.render("index", { title: "Mini Messageboard", messages });
  
});

app.listen(PORT, (req, res) => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

const express = require("express");
const app = express();
const port = 3000;

//EJS setup as templete engine
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

//Sample messages
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

//Route 1: Index
app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

//Route 2: new form
app.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

//Route 2: form submission
app.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect("/");
});

//Route 3: Messages
app.get("/message/:id", (req, res) => {
    const messageId = req.params.id;
    const message = messages[messageId];
    res.render("message", { title: "Message Details", message: message });
  });

//Server Start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
const { Router } = require("express")
const { v4: uuidv4 } = require("uuid"); 

const indexRouter = Router()
const messages = [
  {
    id: uuidv4(),
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  { 
    id: uuidv4(),
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];


indexRouter.get("/", (req, res) => {
  res.render("index", {title: "Mini Messageboard", message: messages});
})

indexRouter.get("/new", (req, res) => {
  res.render("form")
})

indexRouter.post("/new", (req, res) => {
  // console.log(req.body)
  const messageUser = req.body.name;
  const messageText = req.body.message;
  messages.push({ id: uuidv4(), text: messageText, user: messageUser, added: new Date() });

  // sorts it so that later messages are earlier in the array (so the page can act like a feed with most recent on top)
  messages.sort((a, b) => b.added - a.added)
  res.redirect("/")
})

indexRouter.get("/message/:id", (req, res) => {
  const reqId = req.params.id
  const message = messages.find(msg => msg.id === reqId)
  
  if (!message) {
    res.status(404).send("Message not found.")
  } 

  res.render("msgDetails", {msg: message})
})

module.exports = indexRouter
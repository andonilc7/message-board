const db = require("../db/queries")

async function getAllMessages(req, res) {
  const dbMsgs = await db.getAllMessages();
  const messages = dbMsgs.map(msg => {
    const newMsg = {
      id: msg.id,
      user: msg.username,
      text: msg.message,
      added: msg.created_at
    }
    return newMsg;
  })
  res.render("index", {title: "Mini Messageboard", message: messages});
}

function getNewMessageForm(req, res) {
  res.render("form")
}

async function postNewMessage(req, res) {
  // console.log(req.body)
  const messageUser = req.body.name;
  const messageText = req.body.message;
  // messages.push({ id: uuidv4(), text: messageText, user: messageUser, added: new Date() });
  await db.insertNewMessage(messageUser, messageText)
  res.redirect("/")
}

async function getMessageDetails(req, res) {
  const reqId = req.params.id
  const message = await db.findMessage(reqId)
  
  if (!message) {
    res.status(404).send("Message not found.")
  } 

  const newMsg = {
    id: message.id,
    user: message.username,
    text: message.message,
    added: message.created_at
  }

  res.render("msgDetails", {msg: newMsg})
}

module.exports = {
  getAllMessages,
  getNewMessageForm,
  postNewMessage,
  getMessageDetails
}
const { Router } = require("express")
const { v4: uuidv4 } = require("uuid"); 
const messagesController = require("../controllers/messagesController")

const indexRouter = Router();
// const messages = [
//   {
//     id: uuidv4(),
//     text: "Hi there!",
//     user: "Amando",
//     added: new Date()
//   },
//   { 
//     id: uuidv4(),
//     text: "Hello World!",
//     user: "Charles",
//     added: new Date()
//   }
// ];


indexRouter.get("/", messagesController.getAllMessages)
indexRouter.get("/new", messagesController.getNewMessageForm)
indexRouter.post("/new", messagesController.postNewMessage)
indexRouter.get("/message/:id", messagesController.getMessageDetails)

module.exports = indexRouter
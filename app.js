const express = require("express")
const app = express();
const path = require("node:path")
const indexRouter = require("./routes/indexRouter")

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// middleware for parsing form data into req.body
app.use(express.urlencoded({ extended: true }));


app.use("/", indexRouter)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Mini Message Board started - listening on port ${PORT}.`)
})
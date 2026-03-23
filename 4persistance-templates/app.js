const express = require("express");
const bodyP = require("body-parser");
const cookieP = require("cookie-parser");
const helloHandler = require("./handlers/hello-handler");
const consolidate=require('consolidate');
const byeHandler = require("./handlers/bye-handler");

const app = express();
app.use(bodyP.urlencoded({ extended: false })).use(cookieP());
app.use("/s", express.static("static"));
app.engine('html',consolidate.nunjucks); 
app.set('view engine', 'nunjucks');

app.get('/signin', (req, res)=> {
  res.sendFile(__dirname + "/static/form.html");
})

//app.get('/hello', helloHandler )
app.post('/hello', helloHandler)
//app.get('/bye', byeHandler) 
app.post('/bye', byeHandler);

app.all('/', (req, res, next)=> {
  res.redirect("/signin");
})
app.listen(process.env.PORT||3000).on("listening", () => {
  console.log("Server started at http://localhost:3000 ");
}) ; 

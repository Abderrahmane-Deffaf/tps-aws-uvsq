import express from "express";
import { User } from "./app/user_class.js";

const port = 3000; 

const app = express();

app.use(express.json());
app.use(express.static("."));

const connectedUsers = {} ; 

app.post('/save_user_connection', async (req, res) => {
  const name = req.body.name;
  if (name) {
    const user = new User(name);
    connectedUsers[name] = user;
    console.log(`User connected: ${name}`);
    res.status(200).send({ message: `User ${name} connection saved.` });
  } else {
    res.status(400).send({ message: "Name body parameter is required." });
  }
});

app.get('/connect/:user', (req, res) => {
  const user = req.params.user;
  if (connectedUsers[user]) {
    res.status(200).send({ message: `User ${user} is connected.` });
    res.send(`user is connected`);
  } else {
    res.status(404).send({ message: `User ${user} is not connected.` });
  }
});

app.get("/", (req, res) => {
  res.redirect('/vues/index.html');
});



app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
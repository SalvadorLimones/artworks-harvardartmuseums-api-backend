var fs = require("fs");

const { LOADIPHLPAPI } = require("dns");
const express = require("express");
const app = express();
const port = 3101;

const cors = require("cors");
app.use(cors());
app.use(express.json());
const users = require("./users.json");

app.get("/", (req, res) => {
  res.send(`<h1>Metropolitan artwork API Login Server</h1>`);
});

app.get("/api/users/", (req, res) => {
  res.json(users);
});

app.get("/api/users/id/:userid", (req, res) => {
  const id = Number(req.params.userid);
  users.map((user) => {
    if (user.id === id) {
      res.json(user);
    }
  });
});

app.get("/api/users/emails", (req, res) => {
  let emails = [];
  users.map((user) => {
    emails.push({ email: user.email });
  });
  res.json(emails);
});

app.get("/api/users/email/:email", (req, res) => {
  const email = req.params.email;
  users.map((user) => {
    if (user.email === email) {
      res.json({ password: user.password, id: user.id });
    }
  });
});

app.post("/api/user/reg", (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.sendStatus(400);
  }

  for (const user of users) {
    if (user.username === req.body.username || user.email === req.body.email) {
      return res.sendStatus(409);
    }
  }

  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    images: [],
  };

  users.push(newUser);
  fs.writeFileSync("./users.json", JSON.stringify(users, null, 4));
  res.sendStatus(200);
});

app.post("/api/user/login", (req, res) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.sendStatus(401);

  const credentials = authHeader.split("&&&");
  const username = credentials[0];
  const password = credentials[1];
  const user = users.find(
    (user) => username === user.username && password === user.password
  );

  if (!user) return res.sendStatus(401);
  return res.sendStatus(200);
});

app.post("/api/picture/save", (req, res) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.sendStatus(401);

  const credentials = authHeader.split("&&&");
  const username = credentials[0];
  const password = credentials[1];
  let user = users.find(
    (user) => username === user.username && password === user.password
  );

  console.log(user);
  if (!user) return res.sendStatus(401);

  if (!req.body.data) {
    return res.sendStatus(400);
  }

  user.images.push(req.body.data);
  /*   users.push(newUser); */
  fs.writeFileSync("./users.json", JSON.stringify(users, null, 4));
  res.sendStatus(200);

  return res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

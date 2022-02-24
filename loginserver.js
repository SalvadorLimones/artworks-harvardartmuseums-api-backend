var fs = require("fs");

const { LOADIPHLPAPI } = require("dns");
const express = require("express");
const app = express();
const port = 3101;

const cors = require("cors");
app.use(cors());
app.use(express.json());

const users = require("./users.json");
const sessions = {};




app.get("/", (req, res) => {
  res.send(`<h1>Metropolitan artwork API Login Server</h1>`);
});

/* app.get("/api/users/", (req, res) => {
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
}); */




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

  let sessionId = Math.random().toString();
  sessions[sessionId] = user;
  res.json(sessionId);
  console.log(sessions);

  setTimeout(() => {
      delete sessions[sessionId];
  }, 30*24*60*10*1000);



  return res.sendStatus(200);
});

app.post("/api/picture/save", (req, res) => {

  const sessionID = req.header("Authorization");
  if (!sessionID) return res.sendStatus(401);

  const sessionUser = sessions[sessionID];
  if (!sessionUser) {
      return res.sendStatus(401);
  }


  const Susername = sessionUser.username;
  const Spassword = sessionUser.password;
  let user = users.find(
    (user) => user.username === Susername && user.password === Spassword
  );


  if (!user) return res.sendStatus(401);

  if (!req.body.data) {
    return res.sendStatus(400);
  }

  user.images.push(req.body.data);

  fs.writeFileSync("./users.json", JSON.stringify(users, null, 4));


  return res.sendStatus(200);
});








app.post("/api/picture/delete", (req, res) => {
  const sessionID = req.header("Authorization");
  if (!sessionID) return res.sendStatus(401);

  const sessionUser = sessions[sessionID];
  if (!sessionUser) {
      return res.sendStatus(401);
  }

  const Susername = sessionUser.username;
  const Spassword = sessionUser.password;
  let userIndex = users.findIndex(
    (user) => user.username === Susername && user.password === Spassword
  );
  let user = users.find(
    (user) => user.username === Susername && user.password === Spassword
  );



  if (!user) return res.sendStatus(401);
 

  if (!req.body.data) {
    return res.sendStatus(400);
  }

  const pic = user.images.find(
    (pic) => pic.objectnumber === req.body.data
  );

  if (!pic) return res.sendStatus(409);
  let picIndex = users[userIndex].images.findIndex(
    (pic) => pic.objectnumber === req.body.data
  );

 

  users[userIndex].images.splice(picIndex,1)
 

  fs.writeFileSync("./users.json", JSON.stringify(users, null, 4));
  res.sendStatus(200);

  return res.sendStatus(200);
});












app.post("/api/user/galery", (req, res) => {
  const sessionID = req.header("Authorization");
  if (!sessionID) return res.sendStatus(401);

  const sessionUser = sessions[sessionID];
  if (!sessionUser) {
      return res.sendStatus(401);
  }

  const Susername = sessionUser.username;
  const Spassword = sessionUser.password;
  const user = users.find(
    (user) => user.username === Susername && user.password === Spassword
  );


  if (!user) return res.sendStatus(401);


  res.json( user.images);

});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

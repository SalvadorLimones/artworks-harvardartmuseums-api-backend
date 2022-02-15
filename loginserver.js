var fs = require("fs");


const { LOADIPHLPAPI } = require('dns')
const express = require('express')
const app = express()
const port = 3101

const cors = require('cors')
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send(`<h1>Metropolitan artwork API Login Server</h1>`)
  })

fs.readFile('./users.json', function(err, data) {
    const users = JSON.parse(data);
    console.log(users);
  
    app.get('/api/users/', (req, res) => {
      res.json(users)
    })

    app.get('/api/users/:userid', (req, res) => {
        const id = Number(req.params.userid);
        users.map((user) => {
          if(user.id === id) {res.json(user)};
        })
      }) 
  


  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
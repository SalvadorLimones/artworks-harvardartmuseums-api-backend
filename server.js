var fs = require("fs");


const { LOADIPHLPAPI } = require('dns')
const express = require('express')
const app = express()
const port = 3100

const cors = require('cors')
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send(`<h1>Metropolitan artwork API Data Server</h1>`)
  })

fs.readFile('./data.json', function(err, data) {
    const userDatas = JSON.parse(data);
    console.log(userDatas);
  
    app.get('/api/userDatas/', (req, res) => {
      res.json(userDatas)
    })


    app.get('/api/byUserId/:userid', (req, res) => {
      const id = Number(req.params.userid);
      userDatas.map((user) => {
        if(user.id === id) {res.json(user)};
      })
    }) 
  


  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});






































   
  
  
  
  
  
    /* app.get('/api/mails/active', (req, res) => {
      const activeStudentList = mails.filter(mail => mail.status);
      res.json(activeStudentList);
    })
    app.get('/api/mails/finished', (req, res) => {
      const finishedStudentList = mails.filter(mail => !mail.status);
      res.json(finishedStudentList);
    }) */
  
  
  
  
    /* app.post('/api/mails', (req, res) => {
      if (!req.body.name) {
        return res.status(400).json({msg: "Missing parameters"})
      }
      mails.push({id:mails.length +1, name: req.body.name, status: true });
      res.json(students);
  
      fs.writeFile('./data.json', JSON.stringify(mails), (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
      });
    }) */
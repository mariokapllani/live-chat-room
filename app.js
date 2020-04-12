const http=require('http');
const localhost='127.0.0.1';
const port=5000;

var myLogModule=require('./utility');
var express=require('express');
var app=express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    const connectionString='mongodb+srv://keke:keketest@kekedb-lg5ec.mongodb.net/test?retryWrites=true&w=majority';
    const mongoose = require('mongoose')
    const userSchema = require('./userSchema.js')
    const User = mongoose.model('user', userSchema, 'user')

    async function createUser(username) {
      return new User({
        username,
        created: Date.now()
      }).save()
    }

    async function findUser(username) {
      return await User.findOne({ username })
    }

    (async () => {
      const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
      const username = process.argv[2].split('=')[1]

      let user = await connector.then(async () => {
        return findUser(username)
      })

      if (!user) {
        user = await createUser(username)
      }

      console.log(user)
      process.exit(0)
    })();

    res.sendFile(__dirname +'/index.html');
});

app.post('/submit-student-data', function (req, res) {
    var name='Name: '+req.body.firstName;
    var phone='Phone: '+req.body.Phone;

    res.send(name+' '+phone+ ' succesfully save');
});

app.put('/update-data', function (req, res) {
    res.send('PUT Request');
});

app.delete('/delete-data', function (req, res) {
    res.send('DELETE Request');
});

var server=app.listen(port,function(){
    
    console.log('Server is running');
});

var mydb = require("./db");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}))

app.get('/cookie',function (req,res) {

})

/*
app.get('/cookie',function (req, res) {
console.log("host=%s user-agent=%s ip=%s",req.header('host'),req.header('user-agent'),req.header('x-forwarded-for'));

 res.cookie("validLogin", {
    expires: new Date(Date.now() + 1*1*1*10*60*1000)  }); // 10 minute cookie
    //res.cookie("cookie-special","special cookies",{path:'/cookie'});

var sess = req.session;

if(req.cookies) {
    console.log(req.cookies.sammyson101)
} else {
    console.log(req.cookies.sammyson101);
};
*/

app.use(express.static(__dirname + '/client'));

/*
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client');
});
*/

app.get('/login', function (req, res) {
  app.use(express.static('client'));
});

app.get('/news', function (req, res) {
  app.use(express.static('client'));
});

app.get('/getNews', function (req, res) {
  mydb.findAll(req,res);
});

app.get('/findall.json', function (req, res) {
   mydb.findAll(req,res);
});

app.post("/add", function (req,res) {
  //mydb.addLogin(req,res);
  mydb.addEmail(req,res)
});

app.post("/addLogin", function (req,res) {
  mydb.addLogin(req,res);
});

app.post("/addEmail", function (req,res) {
  mydb.addEmail(req,res);
});

app.post("/addN", function (req,res) {
  mydb.getNews(req,res);
});

app.post('/', function (req, res) {
  res.send('post successful');
});

  console.log("Server listening at"+ process.env.PORT);

var server = app.listen(8080, function () {
  console.log("Server listening at"+ process.env.PORT);
});

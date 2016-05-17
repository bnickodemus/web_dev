var mydb = require("./db")
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var urlencodedParser = bodyParser.urlencoded({
  //extended:false
//});
//app.use(bodyParser.urlencoded({'body-parser'}));
app.use(bodyParser.urlencoded({extended:false}))
//app.post('/add',urlencodedParser,function(req,res) {mydb.addCountry(req.res);});
app.post('/add',function (req,res){
  mydb.addCountry(req,res)
}); 

app.use(express.static(__dirname + '/client'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client');
})

app.get('/findall.json', function (req, res) {
  mydb.findAll(req,res); }
);

app.post('/', function (req, res) {
  res.send('Hello Portland');
})

var server = app.listen(process.env.PORT, function () {
  console.log("Server listening at"+ process.env.PORT);
})


var mongo = require('mongodb');
var server = new mongo.Server('localhost',27017,{auto_reconnect:true});
var db=new mongo.Db('ratedb',server);

var countries = [
    {
        country: "India",
        notation: "Rs",
        currency: "Rupees",
        commission:"0.02",
        multiplier:"65"
    },
    {
        country: "Thailand",
        notation: "thb",
        currency: "Baht",
        commission:"0.02",
        multiplier:"35.5"
    }
    ];

db.open(function(err,db) {  
    if(!err) {        
        console.log("Connected to 'ratedb' database");
        db.collection('rates',{strict:true},function(err,collection){
            if(err) { 
                console.log("The rates collection doesn't exit. Lets populate it..");
                populateDB();
            }
        })
    }
 else {
         console.log("Looks like a db error."+ err);
    }})
    

exports.findAll = function(req,res) {
    console.log("in findall");
    var cursor =db.collection('rates').find( ).toArray(function (err, result) {
        if(!err) {
             res.write('{"countries":[');
             //console.log('Found:', result);
             for(var i=0;i<result.length;i++) {
	            if(i>0) res.write(",");
	            res.write("{\":\""+result[i].country
		+"\",\"currency\":\""+result[i].currency+"\"}");             
	         }
        res.write("]}");
	    console.log("done");
	    res.end();
       
        }
    });
};
    
exports.addCountry = function(req,res) {
    var newrec={};
   // console.log(JSON.stringify(req));
    newrec.country=req.body.country; 
    newrec.notation=req.body.notation; 
    newrec.currency=req.body.currency; 
    newrec.comission=req.body.comission; 
    newrec.multiplier = req.body.multiplier; 
    var country = newrec.country; 
    
    console.log(JSON.stringify(newrec)); 
    console.log(req.body); 
    
     db.collection('rates',function(err,collection){ 
        collection.update({"country":country},newrec,{upsert:true}, function(err, result) {
            if (err) {
                console.log("Error"+err);
            } else {
                console.log('Success: ' + JSON.stringify(result));
            }
        });
    });
    
}
    
function populateDB() {
    //declare the countries array using code in previous slide
	
	var countries = [
    {
        country: "India",
        notation: "Rs",
        currency: "Rupees",
        commission:"0.02",
        multiplier:"65"
    },
    {
        country: "Thailand",
        notation: "thb",
        currency: "Baht",
        commission:"0.02",
        multiplier:"35.5"
    }
    ];
	
        db.collection('rates', function(err, collection) {
        collection.insert(countries, {safe:true}, function(err, result) {});
    });

    
   
}



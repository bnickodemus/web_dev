var mongo = require('mongodb');
var server = new mongo.Server('localhost',27017,{auto_reconnect:true});
var db=new mongo.Db('db',server);
var newsdb= new mongo.Db('db',server);
var emaildb= new mongo.Db('db',server);
var db=new mongo.Db('ratedb',server);

db.open(function(err,db) {
    if(!err) {
        console.log("Connected to 'db' database");
        db.collection('login',{strict:true},function(err,collection){
            if(err) {
                console.log("found db, adding login...");
                populate();
            }
        })

    }

    else {
        console.log("Looks like a db error."+ err);
    }})



db.open(function(err,db) {
    if(!err) {
        console.log("Connected to 'ratedb' database");
        db.collection('emails',{strict:true},function(err,collection){
            if(err) {
                console.log("The emails collection doesn't exit. Lets populate it..");
                populateDB();
            }
        })
    }
 else {
         console.log("Looks like a db error."+ err);
    }})


db.open(function(err,db) {
    if(!err) {
        console.log("Connected to 'ratedb' database");
        db.collection('news',{strict:true},function(err,collection){
            if(err) {
                console.log("The news collection doesn't exit. Lets populate it..");
                fillNews();
            }
        })
    }
 else {
         console.log("Looks like a db error."+ err);
    }})

exports.addEmail = function(req,res) {
    var newrec={};
   // console.log(JSON.stringify(req));
    newrec.email=req.body.email;

    var email = newrec.email;

    //console.log(JSON.stringify(newrec));
    //console.log(req.body);

     db.collection('emails',function(err,collection){
        collection.update({"email":email},newrec,{upsert:true}, function(err, result) {
            if (err) {
                console.log("Error"+err);
            } else {
                console.log('Success: ' + JSON.stringify(result));
            }
        });
    });

}


newsdb.open(function(err,db) {
    if(!err) {
        console.log("Connected to 'newsdb' database");
        db.collection('news',{strict:true},function(err,collection){
            if(err) {
                console.log("found newsdb, adding news...");
                fillNews();
            }
        })

    }
    else {
        console.log("Looks like a db error."+ err);
    }})



exports.addNews = function(req,res) {
        var newrec={};
   // console.log(JSON.stringify(req));
    newrec.news=req.body.news;

    var news = newrec.news;

    //console.log(JSON.stringify(newrec));
    console.log("news"+news);



     db.collection('news',function(err,collection){
        collection.update({"news":news},newrec,{upsert:true}, function(err, result) {
            if (err) {
                console.log("Error"+err);
            } else {
                console.log('Success: ' + JSON.stringify(result));
            }
        });
    });

}



exports.addLogin = function(req,res) {
    var newrec={};
    //console.log(JSON.stringify(req));
    newrec.username=req.body.username;
    newrec.password=req.body.password;
    //console.log("i got here");
    var username = newrec.username;
    var password = newrec.password;

    db.collection('login',function(err,collection){
    /*
    //console.log(collection.find(username));
   //collection.find({username:req.body.username}, function(err,result) {
   //var cursor = collection.find().toArray(function(err, items) {
        //console.log(db.collection.find());
        if (err) {
            console.log("could not verify")
            res.write("failed")
        }
        else {
            //console.log("success:" +result);
            console.log(username);
            console.log(password);

        }
    });
    */
    var cursor = db.collection('login').find( ).toArray(function (err, result) {
        if(!err) {
             //res.write("login:");
             //console.log('Found:', result);
             for(var i=0;i<result.length;i++) {
	            //if(i>0) res.write(",");
	            //res.write("{"+result[i].username + " " +result[i].password + "}");
	            if (result[i].username == username) {
	                if (result[i].password == password) {
	                    res.write("correct user and pass")
	                    //make the cookie
	                    res.cookie("validLogin", {
                        expires: new Date(Date.now() + 1*1*1*10*60*1000)  }); // 10 minute cookie
	                }
	            }
	            else {
	                res.write("incorrect username or password")
	            }
	         }
        //res.write("]}");
	    console.log("done");
	    res.end();

        }
    });

    });

}



exports.getNews = function(req,res) {
    var newrec={};

    console.log("i got here");

    db.collection('news',function(err,collection){

    var cursor = db.collection('news').find( ).toArray(function (err, result) {
        if(!err) {

             for(var i=0;i<result.length;i++) {

	            res.write(result[i].news + " ");

	         }
        //res.write("]}");
	    console.log("done");
	    res.end();

        }
    });

    });

}

        //collection.update({"username":username},newrec,{upsert:true}, function(err, result) {
        /*
        collection.update({username},newrec,{upsert:true}, function(err, result) {
            if (err) {
                console.log("Error"+err);
                res.write("Error:Could not verify");
                res.end();
            } else {
                console.log('Success: ' + JSON.stringify(result));
                res.write("Yay Success");
                res.end();
            }
        });
        */






exports.findAll = function(req,res) {
    console.log("in findall");
    var cursor = db.collection('news').find( ).toArray(function (err, result) {
        if(!err) {
             res.write('{"news":[');
             //console.log('Found:', result);
             for(var i=0;i<result.length;i++) {
	            if(i>0) res.write(",");
	            res.write("{\":\""+result[i].comment +"}");
	         }
        res.write("]}");
	    console.log("done");
	    res.end();

        }
    });
};



function fillNews() {
    var news = [
        {
            news: "Next team game on Monday the 24th",
        },
        {
            news:"Johnny is currently the most improved player on the team",
        },
        {
            news: "Don't forgot to win, losers suck",
        }
    ];
    db.collection('news', function(err, collection) {
        collection.insert(news, {safe:true}, function(err, result) {});
    });
}


function populateDB() {
    //declare the countries array using code in previous slide

	var emails = [
    {
        email: "ben@gmail.com",

    },
    {
        email: "bobby@yahoo.com",

    }
    ];

        db.collection('emails', function(err, collection) {
        collection.insert(emails, {safe:true}, function(err, result) {});
    });

}




function populate() {

    var login = [
        {
            username: "coach",


          password: "password"
        }
    ];

    db.collection('login', function(err, collection) {
        collection.insert(login, {safe:true}, function(err, result) {});
    });
}

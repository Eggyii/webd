var express=require('express');
var router=express.Router();
var bodyparser=require("body-parser");
router.use(bodyparser.urlencoded({extended:true}));
var mongodb=require('mongodb');
var mongoclient=mongodb.MongoClient;
var url="mongodb://127.0.0.1:27017/sampledb";

router.get("/view",function(req,res){
    mongoclient.connect(url,function(err,database){
        var db=database.db("sampledb");
        var collection=db.collection("books");
        collection.find().toArray(function(err,result){
            if(err){
                console.log("Error");
            }
            else{

                res.render("viewbook",{"data":result});
                
            }
        });
    });
});
router.get("/new",function(req,res){
    res.render("newbook");
});
router.post("/addbook",function(req,res){
    mongoclient.connect(url,function(err,database){
        var db=database.db("sampledb");
        var collection=db.collection("books");
        var bookdata={"bookid":req.body.book_id,"bookname":req.body.book_name,"author":req.body.Author,"price":req.body.Price,"publisher":req.body.Publisher};
        collection.insert(bookdata,function(err,result){
            if(err)
            {
                console.log("failed to connect");
            }
            else
            {
                res.redirect("/");
            }

        });
    })
})
router.get("/del",function(req,res){
    mongoclient.connect(url,function(err,database){
        var db=database.db("sampledb");
        var collection=db.collection("books");
        collection.find({},{"bookid":1,"_id":0}).toArray(function(err,result){
            if(err){
                console.log("Error");
            }
            else{
                res.render("delbook",{"data":result});
                
            }
        });
    });
});
router.post("/delbook",function(req,res){
    mongoclient.connect(url,function(err,database){
        var db=database.db("sampledb");
        var collection=db.collection("books");
        collection.remove({"bookid":req.body.bid},function(err,result){
            if(err)
            {
                console.log("error deleting");
            }
            else{
                res.redirect("/");
            }
        });
    });
});
router.get("/edit",function(req,res){
    mongoclient.connect(url,function(err,database){
        var db=database.db("sampledb");
        var collection=db.collection("books");
        collection.find({},{"bookid":1,"_id":0}).toArray(function(err,result){
            if(err){
                console.log("Error");
            }
            else{
  
                res.render("editbook",{"data":result});
                
            }
        });
    });
});
router.post("/editbook",function(req,res){
    mongoclient.connect(url,function(err,database){
        var db=database.db("sampledb");
        var collection=db.collection("books");
        collection.find({"bookid":req.body.bid}).toArray(function(err,result){
            if(err){
                console.log("Error");
            }
            else{
    
                res.render("editid",{"data":result});
                
            }
        });
    });
});
router.post("/editadd",function(req,res){
    mongoclient.connect(url,function(err,database){
        var db=database.db("sampledb");
        var collection=db.collection("books");
        var bookdata={"bookname":req.body.book_name,"author":req.body.Author,"price":req.body.Price,"publisher":req.body.Publisher};
        console.log(bookdata);
        collection.update({"bookid":req.body.bid},{$set:bookdata},function(err,result){
            if(err)
            {
                console.log("error making changes");
            }
            else{
                res.redirect("/");
            }
        });
    });
});
module.exports=router;
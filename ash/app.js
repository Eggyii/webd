var express = require("express");
var app=express();
var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
var books=require("./Routes/books")

app.set('view engine','ejs');


app.get("/",function(req,res){
    res.render("home");
});

app.use("/books",books);

app.listen(8000,function(req,res){
    console.log("server started");
}); 
var express = require("express")
var bodyparser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyparser.json())
app.use(express.static("public"))
app.use(bodyparser.urlencoded({
    extended: true
}))

mongoose.connect("mongodb://0.0.0.0:27017/mydb",{
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

var db = mongoose.connection;

db.on("error",()=>console.log("error in connecting to database"));
db.once("open",()=>console.log("connected to database"))

app.post("/signup",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "phone": phone,
        "password": password
    }

    db.collection("users").insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("successfully");
    });

    return res.redirect("signup_success.html")
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect("index.html");
}).listen(3000);

console.log("listening on port 3000");
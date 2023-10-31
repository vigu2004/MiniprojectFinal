const express = require("express");

const bodyParse = require ("body-parser");
const cors= require("cors");

const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb+srv://vignesh20122004:miniproject1@cluster1.n6eqevq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const app = express()

app.use(bodyParse.json())
app.use(express.static('public'))
app.use(bodyParse.urlencoded({
    extended: true
}));

app.use(cors());


//const db = mongoose.connection;


app.get("/" , (req ,res) =>{
    return res.redirect("index.html");
}).listen(3000);

app.post("/login", async(request , response) => {
    const db = client.db('mydb');
    const users = db.collection('Users');
    
    console.log("login route",request.body, users);
    // response.status(200).json({message: "logged in successfully", data: request.body})
    try{

        const username =  request.body.username;
        const password = request.body.password;
        

        const res=await users.findOne({username: username});
        console.log(res);
        if(res===null){
            // response.send("information is incorrect, please sign up first!");
            response.status(500).json({message: "information is incorrect, please sign up first!", data: request.body})
        }
        else if(res.password === password){ 
            //response.send("login success!");
            // return response.redirect("/homepage.html");
            response.status(200).json({message: "logged in successfully", data: request.body})
        }
        else {
            console.log("password incorrect");
            response.status(500).json({message: "password incorrect", data: request.body})

        }

//         db.collection('Users').findOne({username: username},(err , res)=>{
// console.log(res, err)
//             
//         })


    }catch(error){
        console.log("invalid input")
    }
})
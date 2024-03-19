const express = require("express");
const mongoose =  require("mongoose");
const app = express();
const cors = require("cors")
const server = require("http").createServer(app);

app.use(express.json());
app.use(cors())

//database connection
mongoose.connect("mongodb://127.0.0.1:27017/whiteboard")
.then(()=>{
    console.log("db connected")
})
.catch((err)=>{
    console.log(err);
})

const userSchema = mongoose.Schema({
   name:{
    type:String,
    require:true
   },
   roomId:{
    type:String,
    required:true
   }
   
},{timestamps:true})

const userModel = mongoose.model("boardusers",userSchema);

//image schema
const imageSchema = mongoose.Schema({
        image: { 
            type: String,
        },
},{timestamps:true})

const imageModel = mongoose.model("imageurls",imageSchema);
//routes 

//routes for user
app.post("/",(req,res)=>{
    let user = req.body;
    userModel.create(user)
    .then((doc)=>{
        console.log("user crated sucess")
    })
    .catch((err)=>{
        console.log("something went wrong")
    })
})

//routes for sharing drawing
 app.post('/:roomId',(req,res)=>{
    const image = req.body;
    imageModel.create(image)
    .then((image)=>{
        console.log(image)
    })
    .catch((err)=>{
        console.log(err)
    })
 })

app.get('/:roomId',(req,res)=>{
    imageModel.find({})
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
})



const port = process.env.PORT || 5000;

app.listen(5000,()=>{
    console.log("server up and running at 5000");
})
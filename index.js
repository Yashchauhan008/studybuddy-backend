
require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;
const base_url = process.env.BASE_URL

app.use(cors());
app.use(bodyParser.json());
// app.use("/user",)
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello world")
})

mongoose.connect(mongo_uri)
.then(()=>{
    app.listen(port,()=>{
        console.log(`::::: server running on ${port}`);
    })
})
.catch((error)=>{
    console.log(`error:${error}`)
})
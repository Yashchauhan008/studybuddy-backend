
require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;
const base_url = process.env.BASE_URL

const userRouter = require('./src/router/user.router');
const subjecctRouter = require('./src/router/subject.router');
const questionRouter = require('./src/router/question.router');
const codeRouter = require('./src/router/code.router')

app.use(cors());
app.use(bodyParser.json());
app.use("/user",userRouter);
app.use("/subject",subjecctRouter);
app.use("/question",questionRouter);
app.use("/code",codeRouter)
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
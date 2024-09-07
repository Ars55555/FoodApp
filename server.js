const express = require('express');
const colors= require('colors');
const cors=require('cors');
const morgan=require("morgan");
const dotenv=require("dotenv");
const connectDB = require('./config/db');

//create rest object for using rest feature
const app=express();
/// dot  env configuration
dotenv.config();
//DB connection
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

//route
app.use("/api/v1/test",require("./routes/testRoutes")); 
app.use("/api/v1/auth",require("./routes/authRoutes"));
app.use("/api/v1/user",require("./routes/userRoutes"));
app.use("/api/v1/restaurant",require("./routes/restaurantRoutes"));
app.use("/api/v1/category",require("./routes/categoryRoutes"));
app.use("/api/v1/food",require("./routes/foodRoutes")); 

app.get('/',(req,res)=>{
    return res.status(200).send("<h1>Welcome to food app</h1>");
})

const PORT = 5000;

//listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.white.bgMagenta);
});

// nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

/*morgan(format, options)
Create a new morgan logger middleware function (for showing the details of url hit,status code,time )using the given format and options. The format argument may be a string of a predefined name (see below for the names), a string of a format string, or a function that will produce a log entry.

The format function will be called with three arguments tokens, req, and res, where tokens is an object with all defined tokens, req is the HTTP request and res is the HTTP response. The function is expected to return a string that will be the log line, or undefined / null to skip logging.*/

/*Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology*/

/*Cross-origin resource sharing (CORS) is a mechanism that allows a web page to access restricted resources from a server on a domain different than the domain that served the web page*/
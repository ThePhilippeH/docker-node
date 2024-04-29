const express = require("express");
const mongoose = require("mongoose");//the db manager

const app = express();

//connect to the db using the @mongo for ip address because of dns resolution
mongoose
.connect("mongodb://phil:pass@mongo:27017/?authSource=admin")
.then(()=>{console.log("connected to the DB")})
.catch((e)=>  {console.log("error connecting to the DB", e)});

app.get("/", (req, res) => {res.send("wadup?")});

const port = process.env.PORT || 3000; // Port 3000 is the default port

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
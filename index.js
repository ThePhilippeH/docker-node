const express = require("express");
const mongoose = require("mongoose");//the db manager
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  //connect to the db
mongoose
.connect(mongoURL, {})
.then(()=>{console.log("connected to the DB")})
.catch((e)=>{console.log("error connecting to the DB", e)
setTimeout(connectWithRetry, 5000)}); //keep trying to connect every 5 seconds
}

connectWithRetry();

app.get("/", (req, res) => {res.send("wadup?")});

const port = process.env.PORT || 3000; // Port 3000 is the default port

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
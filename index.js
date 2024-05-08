const express = require("express");
const mongoose = require("mongoose");//the db manager
const redis = require("redis");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const cors = require("cors");
const path = require("path");


const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, SESSION_SECRET, REDIS_URL, REDIS_PORT } = require("./config/config");


let redisClient = redis.createClient(
  {
    host: REDIS_URL,
    port: REDIS_PORT,
    legacyMode: true
  }
);


const boulderRouter = require("./routes/boulderRoutes");
const userRouter = require("./routes/userRoutes");

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

//TODO: FIX REDIS CONNECTION
connectWithRetry();

app.enable("trust proxy"); 
app.use(cors({}));
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 6000000,
  },
}));

app.use(express.json());

app.get("/api/v1/", (req, res) => {
  res.send("boulder?");
  console.log("sipi");
});

//different domains should be able to access the api


app.use("/api/v1/users", userRouter);
app.use("/api/v1/boulders", boulderRouter);

const port = process.env.PORT || 3000; // Port 3000 is the default port

// app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
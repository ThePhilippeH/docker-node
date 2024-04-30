const express = require("express");
const mongoose = require("mongoose");//the db manager
const redis = require("redis");
const session = require("express-session");
let RedisStore = require("connect-redis")(session) // Fix: Use the correct syntax to require the connect-redis package

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, SESSION_SECRET, REDIS_URL, REDIS_PORT } = require("./config/config");

let redisClient = redis.createClient(
  {
    host: REDIS_URL,
    port: REDIS_PORT
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

connectWithRetry();

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 60000,
  },
}));


app.use(express.json());

app.get("/", (req, res) => {res.send("boulder?")});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/boulders", boulderRouter);

const port = process.env.PORT || 3000; // Port 3000 is the default port

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
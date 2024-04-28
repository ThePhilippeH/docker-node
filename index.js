const express = require("express");

const app = express();

app.get("/", (req, res) => {res.send("wadup?")});

const port = process.env.PORT || 3000; // Port 3000 is the default port

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const express = require("express");
const app = express();

const PORT = 3000;

app.get("/user", (req, res) => {
  res.send("Hello World from server12");
});

app.get(
  "/user1",
  (req, res) => {
    console.log("handling req 1");
    res.send("Hello World from server1");

    // if we comment the res.send then it not going to print the second one because first request is not completed so it keep going as request.
  },
  (req, res) => {
    console.log("handling req 2");
    res.send("Hello World from server2");
  }
);

app.get(
  "/nextUser1",
  (req, res, next) => {
    console.log("handling req 1");
    res.send("Hello World from server1");
    next();
    // if we comment the res.send then it  going to print the second one because first request is not completed so node calling the next request.
  },
  (req, res) => {j
    console.log("handling req 2");
    res.send("Hello World from server2");
  }
);
app.use((req, res) => {
  res.send("Hello World from server");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

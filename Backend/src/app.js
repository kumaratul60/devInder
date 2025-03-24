const express = require("express");
const { validateUser } = require("./utils/validatetestUser");
const app = express();

const PORT = 3000;

// if define route like app.use it means it can handle all types of the request
// app.use and app.all are same but app.use is more specific.

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
    // if we comment the res.send then it going to print the second one because first request is not completed so node calling the next request.
  },
  (req, res, next) => {
    console.log("handling req 2");
    // res.send("Hello World from server2");
    next();
  },
  (req, res) => {
    console.log("handling req 3");
    res.send("Hello World from server3");
  }
);
// pass as array of functions also
app.get("/nextUser2", [
  (req, res, next) => {
    console.log("handling req 1");
    // res.send("Hello World from server1");
    next();
  },
  (req, res, next) => {
    console.log("handling req 2");
    // res.send("Hello World from server2");
    next();
  },
  (req, res) => {
    console.log("handling req 3");
    res.send("Hello World from server3");
  },
]);

// can do it also
app.get(
  "/nextUser3",
  [
    (req, res, next) => {
      console.log("handling req 1");
      // res.send("Hello World from server1");
      next();
    },
    (req, res, next) => {
      console.log("handling req 2");
      // res.send("Hello World from server2");
      next();
    },
  ],
  (req, res) => {
    console.log("handling req 3");
    res.send("Hello World from server3");
  }
);

app.get("/seperate", (req, res) => {
  res.send("Hello World from server seperate");
});

app.get("/validateUser", validateUser, (req, res) => {
  res.send("Hello World from server validateUser");
});
app.use((req, res) => {
  res.send("Hello World from server use");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

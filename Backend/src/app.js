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

app.get("/separate", (req, res) => {
  res.send("Hello World from server separate");
});

app.get("/validateUser", validateUser, (req, res) => {
  res.send("Hello World from server validateUser");
});

/* here is catch with express params: order matters a-lot
1. if provide 2 params: then it takes first as req, and second as res
2. if provide 3 params: then  it takes first as req, and second as res, and third as next.
3. if provide 4 params: then it takes first as err(error), second as req, third as res, and fourth as next.


*/
// app.use("/",(req, res) => {
//   res.send("Hello World from server use");
// });

// app.use("/",(req, res, next) => {
//   console.log("Hello World from server use with next");
//   // res.send("Hello World from server use");
//   next()
// });
app.get("/getError", (req, res) => {
  //logic of business code
  throw new Error("error here");
  // best way to use try catch always
});

app.use("/", (err, req, res, next) => {
  // next();
  // res.send("Hello World from server use");
  if (err) {
    res.status(500).send("internal server error");
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

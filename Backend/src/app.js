const express = require("express");
const app = express();

const PORT = 3000;

app.use((req, res) => {
  res.send("Hello World from server");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

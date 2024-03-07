const express = require("express");
const cors = require("cors");
const getData = require("./controller");

const method = express();

method.use(cors());

method.listen(7000, () => {
  console.log("Server is started");
});

method.get("/customers", getData);

method.use(
  cors({
    origin: "http://localhost:7000/customers",
  })
);

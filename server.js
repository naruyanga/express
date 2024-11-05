const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");
const users = require("./mockData.json");

app.get("/users", function (req, res) {
  res.send(users);
});

const checkUser = (req, res, next) => {
  const ner = req.body.ner;
  const pass = req.body.pass;
  const user = users.find((user) => {
    return user.pass === pass && user.ner === ner;
  });
  if (user) {
    res.send("amjilttai newterlee");
  } else {
    res.send("medeelel buruu bn");
  }
  next();
};

app.post("/login", checkUser, (req, res) => {});

app.post("/signup", (req, res) => {
  const body = req.body;
  const user = users.find((user) => {
    return body.ner === user.ner;
  });
  if (user) {
    res.send("this user is already signed");
  } else {
    const idGenerator = () => {
      return Math.ceil(Math.random() * 100);
    };
    users.push({ ...body, id: idGenerator() });
    res.send("done");

    fs.writeFileSync("mockData.json", JSON.stringify(users), (err) => {
      console.log(err);
    });
  }
});

app.listen(3000);

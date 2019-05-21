const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const Users = require("./users/model-user");
const loggedIn = require("./loggedIn");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.post("/api/register", (res, req) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;

  Users.add(user)
    .then(list => {
      res.status(201).json(list);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post("/api/login", (res, req) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: "Logged In" });
      } else {
        res.status(400).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/api/users", loggedIn, (req, res) => {
    Users.find().then(users => {
        res.json(users);
    })
    .catch(err => {res.status(500).json(err)
    });
});


const port = process.env.PORT || 5000;
server.listen(port, () => console.log('\n** Running on port ${port} **\n'));
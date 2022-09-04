const { read, readDir, create, remove, update } = require("../lib/data");

module.exports.getRandomUser = (req, res) => {
  readDir("users", (err, users) => {
    if (!err && users) {
      const limit = users.length;
      const id = Math.ceil(Math.random() * limit);
      read("users", id, (err, user) => {
        if (err) {
          res.status(500).send("user not found");
        } else {
          res.send(user);
        }
      });
    }
  });
};

module.exports.saveRandomUser = (req, res) => {
  readDir("users", (err, users) => {
    const Id = users.length + 1;
    if (!err && users) {
      const body = { Id, ...req.user };
      create("users", Id, body, (err) => {
        if (!err) {
          res.send("data save succesfull");
        } else {
          res.send(`server side error1`);
        }
      });
    } else {
      res.send("server side error");
    }
  });
};

module.exports.deleteUser = (req, res) => {
  const id = req.params.id;
  remove("users", id, (err) => {
    if (!err) {
      res.send("delete is successfull");
    } else {
      res.status(500).send("server side error");
    }
  });
};

module.exports.getAllUsers = (req, res) => {
  if (req.data) {
    console.log(+req.query.limit);
    const limit = +req.query.limit;
    const page = +req.query.page;
    const sendingData = req.data.splice(page - 1, limit);
    res.send(sendingData);
  } else {
    res.status(500).send("not found user");
  }
};

module.exports.updateAUser = (req, res) => {
  const id = req.params.id;
  read("users", id, (err, data) => {
    if (!err) {
      const user = JSON.parse(data);
      if (req.user.name) {
        user.name = req.user.name;
      }
      if (req.user.gender) {
        user.gender = req.user.gender;
      }

      update("users", id, user, (err) => {
        if (!err) {
          res.send("update successfull");
        } else {
          res.status(500).send("updated falild");
        }
      });
    } else {
      res.status(500).send("user not found");
    }
  });
};



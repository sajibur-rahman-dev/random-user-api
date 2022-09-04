const { readDir, read } = require("../../lib/data");

module.exports.validateUsers = (req, res, next) => {
  const name =
    typeof req.body.name === "string" && req.body.name.trim().length > 0
      ? req.body.name
      : false;

  const gender =
    typeof req.body.gender === "string" && req.body.gender.trim().length > 0
      ? req.body.gender
      : false;

  const contact =
    typeof req.body.contact === "string" &&
    req.body.contact.trim().length === 11
      ? req.body.contact
      : false;

  const address =
    typeof req.body.address === "string" && req.body.address.trim().length > 0
      ? req.body.address
      : false;

  const photoUrl =
    typeof req.body.photoUrl === "string" && req.body.photoUrl.trim().length > 0
      ? req.body.photoUrl
      : false;

    const user = {
      name,
      gender,
      contact,
      address,
      photoUrl
    }

  if ((name && gender && contact && address && photoUrl) || (name || gender || contact || address || photoUrl)) {
    req.user = user
    next();
  } else {
    res.status(400).send("bad request");
  }
};

module.exports.validateId = (req, res, next) => {
  readDir("users", (err, users) => {
    const id = req.params.id;
    const dbUsers = [];
    users.forEach((user) => dbUsers.push(user.replace(".json", "")));
    if (dbUsers.includes(id)) {
      next();
    } else {
      res.status(500).send("user not found");
    }
  });
};

module.exports.setAllUsers = (req,res,next) => {
  readDir("users", (err, originalUsers) => {
    console.log(originalUsers);
    const users = [];
    originalUsers.forEach((user) => {
      read("users", user.replace(".json", ""), (err, data) => {
        users.push(JSON.parse(data));
        if(users.length === originalUsers.length){
          req.data = users
          next()
        }
      })
    })
  })
}

module.exports.updateMultipleUsers = (req,res,next) => {
  
}


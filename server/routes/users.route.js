module.exports = function (router) {
  //=========================================================
  // setup endpoints
  //---------------------------------------------------------
  router.get('/users', getAllUsers);
  router.post('/users', addNewuser);
  router.put('/users/:_id', updateUser);
  router.delete('/users/:_id', removeUser);


  //=========================================================
  // require mongoose models
  //---------------------------------------------------------
  const UserModel = require('../models/user.model');


  //=========================================================
  // GET - get all users
  //---------------------------------------------------------
  function getAllUsers (req, res) {

    // get all the users
    UserModel.find({}, function (err, users) {
      if (err) {
        res.status(500).send(err);
        return;
      }

      res.status(200).json(users);
    });
  };


  //=========================================================
  // POST - save new user
  //---------------------------------------------------------
  function addNewuser (req, res) {
    let user = new UserModel(req.body);
    console.log('POST user');

    // call the built-in save method to save to the database
    user.save(function (err, user) {
      if (err) {
        res.status(500).send(err);
        return;
      }

      res.status(200).json(user);
    });
  };

  //=========================================================
  // PUT - save new user
  //---------------------------------------------------------
  function updateUser (req, res) {
    let user = new UserModel(req.body);
    console.log('PUT user');

    UserModel.findByIdAndUpdate(req.params._id, req.body, function (err, user) {
      if (err) {
        res.status(500).send(err);
        return;
      }

      res.status(200).json(user);
    });
  };

  //=========================================================
  // DELETE - save new user
  //---------------------------------------------------------
  function removeUser (req, res) {
    console.log('POST user');

    UserModel.findByIdAndRemove(req.params._id, function (err, response) {
      if (err) {
        res.status(500).send(err);
        return;
      }

      res.status(200).json(response);
    });
  };
}

const express = require('express');
const router = express.Router();

const usersRoute = require('./users.route')(router); // pass router into users.route so it can be extended by the code therein

// const axios = require('axios');
// const API = 'https://jsonplaceholder.typicode.com';

//=========================================================
// GET api listing.
//---------------------------------------------------------
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
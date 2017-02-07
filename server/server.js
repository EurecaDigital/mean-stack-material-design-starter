//=========================================================
// Get dependencies
//---------------------------------------------------------
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


//=========================================================
// connect to mongodb
//---------------------------------------------------------
mongoose.connect('mongodb://localhost/blog');


//=========================================================
// Get our API routes
//---------------------------------------------------------
const api = require('./routes/api.base.route');


//=========================================================
// create server app
//---------------------------------------------------------
const app = express();


//=========================================================
// cors stuff
//---------------------------------------------------------
// app.use(cors({origin: 'http://localhost:8080'}));
app.use(cors());


//=========================================================
// Parsers for POST data
//---------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//=========================================================
// Point static path to dist
//---------------------------------------------------------
app.use(express.static(path.join(__dirname, 'dist')));


//=========================================================
// Set our api routes
//---------------------------------------------------------
app.use('/api', api);


//=========================================================
// Catch all other routes and return the index file
//---------------------------------------------------------
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


//=========================================================
// Get port from environment and store in Express.
//---------------------------------------------------------
const port = process.env.PORT || '7070';
app.set('port', port);


//=========================================================
// Create HTTP server.
//---------------------------------------------------------
const server = http.createServer(app);


//=========================================================
// Listen on provided port, on all network interfaces.
//---------------------------------------------------------
server.listen(port, () => console.log(`API running on localhost:${port}`));
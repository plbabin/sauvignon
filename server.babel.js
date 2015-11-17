/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import 'babel-core/polyfill';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';

const server = global.server = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.set('port', (process.env.PORT || 5000));
server.use(express.static('public'));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//
// Launch the server
// -----------------------------------------------------------------------------

server.listen(server.get('port'), () => {
  /* eslint-disable no-console */
  console.log('The server is running at http://localhost:' + server.get('port'));
  if (process.send) {
    process.send('online');
  }
});

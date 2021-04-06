const express = require('express');
const server = express();
const routes = require('./routes');
const path = require('path');

server.set('view engine', 'ejs');

server.use(express.static('public'));

/**
 * req.body liberado no express
 */

server.use(express.urlencoded({ extended: true }));

//ajuste pasta views
server.set('views',path.join(__dirname, 'views'));

server.use(routes);

server.listen(80, () => {

});
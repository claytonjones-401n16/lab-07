'use strict';

require('dotenv').config();

const server = require('./lib/server.js');

const port = process.env.PORT || 3000;

server.start(port);

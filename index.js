'use strict';

require('dotenv').config();

const server = require('./lib/server.js');

const port = process.env.PORT || 3000;
const mongodb = process.env.MONGODB_URI;

server.start(port, mongodb);

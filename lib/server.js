'use strict';

const express = require('express');

const app = express();


const serverStart = (port) => {
  app.listen(port, () => { console.log(`Server up and running on port ${port}.`); });
}

module.exports = {
  server: app,
  start: serverStart,
}
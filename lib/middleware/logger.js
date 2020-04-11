'use strict';

const logger = (req, res, next) => {
  console.log(`Request ${req.method} at ${req.url} placed ${req.requestTime}`);
  next();
}

module.exports = logger;
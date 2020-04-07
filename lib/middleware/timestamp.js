'use strict';

const timestamp = (req, res, next) => {
  const time = new Date();
  req.requestTime = time;
  next();
}

module.exports = timestamp;
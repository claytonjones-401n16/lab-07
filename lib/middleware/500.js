'use strict';

const internalError = (err, req, res, next) => {
  req.status(500);
  req.statusMessage = 'Internal Server Error';
  res.end();
}
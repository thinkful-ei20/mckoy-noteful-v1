'use strict';

const requestLogger = (req, res, next) => {
  const today = new Date();
  console.log(`
  Today is ${today.toLocaleDateString()} at ${today.toLocaleTimeString()} using the ${req.method} at address ${req.url}`);
  next();
};

module.exports = {requestLogger}

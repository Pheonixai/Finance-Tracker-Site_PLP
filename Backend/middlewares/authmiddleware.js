"use strict";
exports.isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).send("Unauthorized! Please log in.");
  }
  next(); // User is authenticated, proceed to the next middleware or route handler
};

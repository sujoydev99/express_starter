module.exports = (err, req, res, next) => {
  res.status(err.statusCode ? err.statusCode : 500).send({
    message: err.customMessage ? err.customMessage : "Please contact the ADMIN",
  });
};

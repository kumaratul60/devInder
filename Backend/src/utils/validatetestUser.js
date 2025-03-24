const validateUser = (req, res, next) => {
  console.log("validating user");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("unauthorized");
    return;
  } else {
    next();
  }
};

module.exports = {validateUser};
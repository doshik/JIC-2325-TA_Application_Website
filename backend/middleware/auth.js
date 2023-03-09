const jwt = require("jsonwebtoken");
const jwtsecret = process.env.ACCESS_TOKEN_SECRET;

exports.userAuth = (req, res, next) => {
  const token = req.cookies.jwt.accessToken;
  if (!token) return res.status(401).json("Access denied.");

  try {
    const verified = jwt.verify(token, jwtsecret);
    console.log("Verified: ", verified);
    req.user = verified;
    console.log("User: ", req.user, " is verified.");
    next();
  } catch (err) {
    console.log("Error: ", err);
    res.status(400).json({ msg: "Invalid JWT Token." });
  }
};

exports.generateToken = (user) => {
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return { accessToken };
};

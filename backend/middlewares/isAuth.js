import jwt from "jsonwebtoken";

const isauth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "User is not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userid = decoded.id; // ✅ corrected this line
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default isauth;

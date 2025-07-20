import jwt from "jsonwebtoken";

const gentoken = async (userId) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

export default gentoken;

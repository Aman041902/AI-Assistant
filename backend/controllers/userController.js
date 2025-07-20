import User from "../models/userModel.js";
import uploadCloudinary from "../config/cloudinary.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userid).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateassistant = async (req, res) => {
  try {
    const { userAssistant, imageurl } = req.body;
    let assistantImg;

    if (req.file) {
      assistantImg = await uploadCloudinary(req.file.path); // ✅ Await it
    } else {
      assistantImg = imageurl;
    }

    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const user = await User.findByIdAndUpdate(
      req.userid,
      { userAssistant, assistantImg },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Update assistant error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

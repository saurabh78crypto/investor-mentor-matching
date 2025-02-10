import User from "../models/User.js";

const fetchUserByEmail = async (email) => {
  try {
    if (!email) throw new Error("Email address is required.");

    return await User.findOne({ email });
  } catch (error) {
    console.error("Error fetching user by email:", error.message);
    return null;
  }
};

export { fetchUserByEmail };

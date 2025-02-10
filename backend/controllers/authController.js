import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.AUTH_CLIENT_ID);

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.AUTH_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, credits: 5 });
      await user.save();
    }

    const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token: authToken, email, credits: user.credits });
  } catch (error) {
    console.error("Google Token Verification Error:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
};

export { googleLogin };

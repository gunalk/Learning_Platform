import bcrypt from "bcryptjs";
import user from "../../models/user.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;
  const existingUser = await user.findOne({
    $or: [{ userName: userName }, { userEmail: userEmail }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User name or user email already exists",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new user({
    userName,
    userEmail,
    role,
    password: hashPassword,
  });
  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "User Registered Successfully!",
  });
};

export const LoginUser = async (req, res) => {
  try {
    const { userEmail, password } = req.body;

    if (!userEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const existingUser = await user.findOne({ userEmail });

    if (!existingUser || !existingUser.password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = jwt.sign(
      {
        _id: existingUser._id,
        userName: existingUser.userName,
        userEmail: existingUser.userEmail,
        role: existingUser.role,
      },
      "JWT_SECRET",
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: { accessToken },
      user: {
        _id: existingUser._id,
        userName: existingUser.userName,
        userEmail: existingUser.userEmail,
        role: existingUser.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

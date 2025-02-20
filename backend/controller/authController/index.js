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
  const newUser = new user({ userName, userEmail, role, hashPassword });
  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "User Registered Successfully!",
  });
};

export const LoginUser = async (res, req) => {
  try {
    const { userEmail, password } = req.body;
    const existingUser = await UserActivation.findOne({ userEmail });
    if (!existingUser || !bcrypt.compare(existingUser.password, password)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const accessToken = jwt.sign(
      {
        _id: existingUser?._id,
        userName: existingUser?.userName,
        userEmail: existingUser?.userEmail,
        role: existingUser?.role,
      },
      "JWT_SECRET",
      { expiresIn: "120m" }
    );

    res.status(200).json({
      sucesss: true,
      message: "Logged In Successfully",
      data: {
        accessToken,
      },
      user: {
        _id: existingUser?._id,
        userName: existingUser?.userName,
        userEmail: existingUser?.userEmail,
        role: existingUser?.role,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

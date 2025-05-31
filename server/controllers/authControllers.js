const users = require("../models/users");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await users.findOne({ email });
    if (existing) {
      res.json({ errors: false, message: "Email already exist" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await users.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};


//USER LOING

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (!user) {
        return res.json({ message: "Invalid credentials" });
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};



const refreshAccessToken = (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.sendStatus(401); 
  }

  try {
    const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = jwt.sign(
      { id: userData.id, role: userData.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.sendStatus(403); 
  }
};


// ADMIN LOGIN

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await users.findOne({ is_admin:true,email });
    if (!admin) return res.json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.json({ message: "Invalid password" });

    const accessToken = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      accessToken,
      id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};



module.exports = {
  SignUp,
  login,
  refreshAccessToken,
  adminLogin
};

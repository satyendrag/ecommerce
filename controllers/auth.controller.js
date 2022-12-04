import User from "../models/user.schema";
import asyncHandler from "../services/asyncHandler";
import CustomError from "../utils/CustomError";

export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomError("Name, email and password filled is Required", 400);
  }
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new CustomError("User Already Exist", 400);
  }

  const user = User.create({
    name,
    email,
    password,
  });

  const token = user.getJwtToken();
  user.password = undefined;
  // pass cookie option also
  res.cookie("token", token);

  res.status(200).send({
    success: true,
    user,
    token,
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("email and password filled is Required", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomError("Invalid credentials", 400);
  }
  const isValidUser = await user.comparePassword(password);
  if (!isValidUser) {
    throw new CustomError("Invalid credentials", 400);
  }

  const token = user.getJwtToken();
  user.password = undefined;
  // pass cookie option also
  res.cookie("token", token);

  res.status(200).send({
    success: true,
    user,
    token,
  });
});

export const logOut = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).send({
    success: true,
    message: "User logout successfully",
  });
});

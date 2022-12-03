import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthRoles from "../utils/AuthRoles";
import config from "../config";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxLength: [50, "Name should be less than 50 chars"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "Password have atleast 8 chars"],
      select: false,
    },

    role: {
      type: String,
      enums: Object.values(AuthRoles),
      default: AuthRoles.USER,
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
  },
  //auto generate time stamps created_at and updated_at
  {
    timestamps: true,
  }
);

// encrypting password before save
userSchema.pre("save", async function (next) {
  if (!this.modified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// creating some usefull schema related methods
userSchema.methods = {
  //compare password
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },
  // generate jwt token

  getJwtToken: function () {
    return jwt.sign({ _id: this._id, role: this.role }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRY,
    });
  },
};

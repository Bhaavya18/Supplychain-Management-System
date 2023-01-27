import Business from "../models/Business.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newBusiness = new Business({
      ...req.body,
      password: hash,
    });

    await newBusiness.save();
    res.status(200).send("Business has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const business = await Business.findOne({ name: req.body.name });
    if (!business) return next(createError(404, "Business not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      business.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: business._id, isAdmin: business.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = business._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

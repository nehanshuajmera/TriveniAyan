import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

/* ------------ Users Query ------------ */
/* Create Token Function */
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* Format Date Function */
const formatDateTime = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  let hours = d.getHours();
  const minutes = (`0${d.getMinutes()}`).slice(-2);
  const seconds = (`0${d.getSeconds()}`).slice(-2);

  /* Determine AM/PM suffix */
  const ampm = hours >= 12 ? 'PM' : 'AM';
  /* Convert hours to 12-hour format */
  hours = hours % 12;
  hours = hours ? hours : 12; /* the hour '0' should be '12' */

  return `${hours}:${minutes}:${seconds} ${ampm} - ${day}/${month}/${year}`;
};

/* All Users Controller */
export const allUsers = async () => {
  try {
    const users = await User.find({});
    return users.map((user) => ({
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      role: user.role,
      createdAt: formatDateTime(user.createdAt),
      updatedAt: formatDateTime(user.updatedAt),
    }));
  } catch (err) {
    console.error(`Error fetching Users: ${err.message}`);
    throw new Error(`Error fetching Users: ${err}`);
  }
};

/* User By ID Controller */
export const userById = async (_, { id }) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      role: user.role,
      createdAt: formatDateTime(user.createdAt),
      updatedAt: formatDateTime(user.updatedAt),
    };
  } catch (err) {
    console.error(`Error fetching User by ID: ${err.message}`);
    throw new Error(`Error fetching User by ID: ${err}`);
  }
};

/* ------------ User Mutations ------------ */
/* User Registration Controller */
export const registerUser = async (_, { input }, { res }) => {
  try {
    const { name, username, email, password, phoneNumber } = input;
    const user = await User.registerUser({
      name,
      username,
      email,
      password,
      phoneNumber,
    });

    const token = createToken(user._id, "user");

    /* Set the cookie via context's response object */
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000 /* Expires in 7 days */,
    });

    return { token, username: user.username };
  } catch (err) {
    console.error(`Error registering User: ${err.message}`);
    throw new Error(`Error registering User: ${err.message}`);
  }
};

/* User Login Controller */
export const loginUser = async (_, { input }, { res }) => {
  try {
    const { usernameOrEmail, password } = input;
    const user = await User.loginUser({ usernameOrEmail, password });

    const token = createToken(user._id, "user");

    /* Set the cookie via context's response object */
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000 /* Expires in 7 days */,
    });

    return { token, username: user.username };
  } catch (err) {
    console.error(`Error logging in User: ${err.message}`);
    throw new Error(`Error logging in User: ${err}`);
  }
};

/* Update User Controller */
export const updateUser = async (_, { id, user }) => {
  try {
    const { name, username, email, password, phoneNumber } = user;

    /* Find the user in the database */
    const existingUser = await User.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    /* Update the user object */
    const updateFields = {
      name: name || existingUser.name,
      username: username || existingUser.username,
      email: email || existingUser.email,
      phoneNumber: phoneNumber || existingUser.phoneNumber,
    };

    /* If password is provided, add it to the update fields */
    if (password) {
      updateFields.password = password;
    }

    /* Find and update the user in the database */
    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      throw new Error("Error updating user");
    }

    return updatedUser;
  } catch (err) {
    console.error(`Error updating User: ${err.message}`);
    throw new Error(`Error updating User: ${err}`);
  }
};

/* Update User Address Controller */
export const updateUserAddress = async (_, { id, address }) => {
  try {
    const { street, city, country, postalCode } = address;
    const existingUser = await User.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    existingUser.address = {
      street: street || existingUser.address.street,
      city: city || existingUser.address.city,
      country: country || existingUser.address.country,
      postalCode: postalCode || existingUser.address.postalCode,
    };

    const updatedUser = await existingUser.save();

    if (!updatedUser) {
      throw new Error("Error updating user address");
    }

    return updatedUser;
  } catch (err) {
    console.error(`Error updating User Address: ${err.message}`);
    throw new Error(`Error updating User Address: ${err}`);
  }
};

/* Delete User Controller */
export const deleteUser = async (_, { id }) => {
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    console.error(`Error deleting User: ${err.message}`);
    throw new Error(`Error deleting User: ${err}`);
  }
};

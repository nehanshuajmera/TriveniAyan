import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

/* Create Token Function */
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* All Users Controller */
export const allUsers = async () => {
  try {
    const users = await User.find({}); // Fixed: fetch all users
    return users;
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

    return user;
  } catch (err) {
    console.error(`Error fetching User by ID: ${err.message}`);
    throw new Error(`Error fetching User by ID: ${err}`);
  }
};

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
      maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days
    });

    return { token, user };
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

    const token = createToken(user._id);

    /* Set the cookie via context's response object */
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days
    });

    return { token, user };
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

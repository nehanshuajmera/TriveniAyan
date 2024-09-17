import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";
import bcrypt from "bcrypt";
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    id: {
      type: String,
      required: true,
      default: uuidv4(),
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      postalCode: {
        type: String,
        trim: true,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
      trim: true,
    },
    booking: [
      {
        type: schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    payment: [
      {
        type: schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    review: [
      {
        type: schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

/* Register User */
userSchema.registerUser = async function ({
  name,
  username,
  email,
  password,
  phoneNumber,
}) {
  if (!name || !username || !email || !password || !phoneNumber) {
    throw new Error("Please provide all fields");
  }

  if (!validator.matches(username, "^[a-z0-9_.-]{8,}$")) {
    throw new Error(
      "Username is not valid. It must be at least 8 characters long and can contain lowercase letters, numbers, underscores, dots, and dashes."
    );
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    })
  ) {
    throw new Error(
      "Password must contains at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol."
    );
  }

  if (!validator.isMobilePhone(phoneNumber)) {
    throw new Error("Invalid Phone Number!!");
  }

  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw new Error(
      "Username is already taken. Please choose a different username."
    );
  }

  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw new Error(
      "email is already in use. Please choose a different email."
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = this.create({
    name,
    username,
    email,
    password: hashedPassword,
    phoneNumber,
  });

  return user;
};

/* Login User */
userSchema.loginUser = async function ({ usernameOrEmail, password }) {
  if (!usernameOrEmail || !password) {
    throw new Error("Please provide all fields");
  }

  const user = await this.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};

export const User = mongoose.model("User", userSchema);

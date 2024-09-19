import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
      state: {
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
        validate: {
          validator: (postalCode) => validator.isPostalCode(postalCode, "any"), // Validate postal code for any locale
          message: "Invalid Postal Code",
        },
      },
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
userSchema.statics.registerUser = async function ({
  name,
  email,
  password,
  phoneNumber,
}) {
  if (!name || !email || !password || !phoneNumber) {
    throw new Error("Please provide all fields");
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

  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw new Error(
      "email is already in use. Please choose a different email."
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
  });

  return user;
};

/* Login User */
userSchema.statics.loginUser = async function ({ email, password }) {
  if (!email || !password) {
    throw new Error("Please provide all fields");
  }

  const user = await this.findOne({ email });

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

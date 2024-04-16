//user.service.ts
import { prisma } from "../index";
import { signUserToken } from "./auth.service";

export const createNewUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const { name, email, password } = data;

    //Hash the password using the Bun package and bcrypt algorithm
    const hashedPassword = await Bun.password.hash(password, {
      algorithm: "bcrypt",
    });

    //Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const { email, password } = data;

    //Find the user
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    //Verify the password
    const valid = await Bun.password.verify(password, user.password);

    if (!valid) {
      throw new Error("Invalid credentials");
    }

    // //Sign the JWT token
    const token = signUserToken({
      id: user.id,
      email: user.email,
    });

    return {
      message: "User logged in successfully",
      token,
    };
  } catch (error) {
    throw error;
  }
};
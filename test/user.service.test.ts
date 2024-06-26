// user.service.test.ts
import { describe, it, expect, beforeEach } from "bun:test";
import { prisma } from "../index";
import { createNewUser, login } from "../services/user.service";
import { signUserToken } from "../services/auth.service";

// jest.mock('../services/auth.service', () => ({
//   signUserToken: jest.fn(),
// }));

describe("User Service", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  describe("createNewUser", () => {
    it("should create a new user with hashed password", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      const user = await createNewUser(userData);

      expect(user).toBeTruthy();
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      // Password should be hashed, so it shouldn't equal the plaintext password
      expect(user.password).not.toBe(userData.password);
    });

    it("should throw an error if user creation fails", async () => {
      const userData = {
        name: "",
        email: "test@example.com",
        password: "password123",
      };

      await expect(createNewUser(userData)).rejects.toThrow();
    });
  });

  describe("login", () => {
    it("should login a user with valid credentials", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      await createNewUser(userData);

      const loginData = {
        email: userData.email,
        password: userData.password,
      };

      const token = "sampleToken";
      (signUserToken as jest.Mock).mockReturnValue(token);

      const result = await login(loginData);

      expect(result).toBeTruthy();
      expect(result.message).toBe("User logged in successfully");
      expect(result.token).toBe(token);
    });

    it("should throw an error if user is not found", async () => {
      const loginData = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      await expect(login(loginData)).rejects.toThrow("User not found");
    });

    it("should throw an error if password is invalid", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      await createNewUser(userData);

      const loginData = {
        email: userData.email,
        password: "wrongpassword",
      };

      await expect(login(loginData)).rejects.toThrow("Invalid credentials");
    });
  });
});

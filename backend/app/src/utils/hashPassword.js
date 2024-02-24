import bcrypt from "bcryptjs";

export const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
};

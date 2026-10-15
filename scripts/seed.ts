import { loadEnvConfig } from "@next/env";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const isDev = process.env.NODE_ENV !== "production";

loadEnvConfig(process.cwd(), isDev);

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable before running the seed script."
  );
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN"], index: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

const seedUsers = [
  {
    username: "admin",
    password: "Admin@123",
    role: "ADMIN",
  },
  {
    username: "user",
    password: "User@123",
    role: "USER",
  },
];

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.");

  for (const userData of seedUsers) {
    const existing = await User.findOne({ username: userData.username });
    if (existing) {
      console.log(`  Skipping ${userData.username} (already exists)`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);
    await User.create({
      username: userData.username,
      password: hashedPassword,
      role: userData.role,
    });
    console.log(`  Created ${userData.role}: ${userData.username}`);
  }

  console.log("\nSeed complete. Users:");
  for (const u of seedUsers) {
    console.log(`  ${u.username} / ${u.password} (${u.role})`);
  }

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

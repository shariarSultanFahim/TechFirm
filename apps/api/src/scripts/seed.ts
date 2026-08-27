import mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/fullstack_assessment_db";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    refreshToken: { type: String }
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

async function seed() {
  console.log("🌱 Starting Database Seed...");
  console.log(`Connecting to MongoDB at: ${MONGODB_URI}`);

  await mongoose.connect(MONGODB_URI);

  const salt = await bcrypt.genSalt(10);

  // 1. Seed Admin User
  const adminEmail = "admin@example.com";
  const adminPassword = "Admin123!";
  const hashedAdminPassword = await bcrypt.hash(adminPassword, salt);

  const admin = await UserModel.findOneAndUpdate(
    { email: adminEmail },
    {
      name: "Admin User",
      email: adminEmail,
      password: hashedAdminPassword,
      role: "admin"
    },
    { upsert: true, new: true }
  );

  console.log(`✅ Admin user seeded:`);
  console.log(`   - Email: ${admin.email}`);
  console.log(`   - Password: ${adminPassword}`);
  console.log(`   - Role: ${admin.role}`);

  // 2. Seed Standard User
  const userEmail = "user@example.com";
  const userPassword = "User123!";
  const hashedUserPassword = await bcrypt.hash(userPassword, salt);

  const user = await UserModel.findOneAndUpdate(
    { email: userEmail },
    {
      name: "Standard User",
      email: userEmail,
      password: hashedUserPassword,
      role: "user"
    },
    { upsert: true, new: true }
  );

  console.log(`✅ Standard user seeded:`);
  console.log(`   - Email: ${user.email}`);
  console.log(`   - Password: ${userPassword}`);
  console.log(`   - Role: ${user.role}`);

  console.log("\n🎉 Database seeding completed successfully!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed with error:", err);
  mongoose.disconnect();
  process.exit(1);
});

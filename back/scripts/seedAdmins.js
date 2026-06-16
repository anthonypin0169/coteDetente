require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');

const admins = [
  { name: process.env.ADMIN1_NAME, email: process.env.ADMIN1_EMAIL, password: process.env.ADMIN1_PASSWORD },
  { name: process.env.ADMIN2_NAME, email: process.env.ADMIN2_EMAIL, password: process.env.ADMIN2_PASSWORD },
];

const seed = async () => {
  await connectDB();

  for (const admin of admins) {
    if (!admin.name || !admin.email || !admin.password) {
      console.log(`Variables manquantes pour un admin, ignoré.`);
      continue;
    }

    const existing = await User.findOne({ email: admin.email });
    if (existing) {
      console.log(`Compte déjà existant : ${admin.email}`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(admin.password, 10);
    await User.create({ name: admin.name, email: admin.email, password: hashedPassword, role: 'admin' });
    console.log(`Compte admin créé : ${admin.email}`);
  }

  await mongoose.disconnect();
};

seed();

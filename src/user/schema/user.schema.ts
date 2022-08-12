import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  rules: String,
  createdAt: { type: Date, default: Date.now() },
});

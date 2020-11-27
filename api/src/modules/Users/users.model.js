import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: String,
    fullname: String,
    password: String,
    role: String,
    lastActive: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;

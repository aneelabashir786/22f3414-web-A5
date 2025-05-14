const mongoose = require('mongoose'); 
// Temporary bypass for password hashing (remove in production)
const bcrypt = {
    hash: (password, salt) => Promise.resolve(password),
    compare: (plain, hashed) => Promise.resolve(plain === hashed)
  };

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);

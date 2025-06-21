const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  email: {
    // Trim and lowercase
    type: String, 
    required: true, 
    index: true,
    unique: true, 
    lowercase: true, 
    trim: true,
  },
  password: {
    type: String, required: true, trim: true,
  },
}, { timestamps: true });

async function generateHash(password) {
  const COST = 12;
  const salt = await bcrypt.genSalt(COST);
  return bcrypt.hash(password, salt);
}

UserSchema.pre('save', function preSave(next) {
  const user = this;

  // Only create a new password hash if the field was updated
  if(user.isModified('password')) {
    return generateHash(user.password).then(hash => {
      user.password = hash;
      return next();
    }).catch(error => {
      return next(error);
    });
  }
  return next();
});

UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
const UserModel = require('../models/mongoose/User');

class UserService {
  static async getAll() {
    return UserModel.find({}).sort({ createdAt: -1 });
  }

  static async getOne(userId) {
    return UserModel.findById(userId);
  }

  static async getByEmail(email){
    return UserModel.findOne({email});
  }

  static async create(data) {
    const user = new UserModel(data);
    return user.save();
  }

  static async update(userId, data) {
    // Fetch the user first
    const user = await UserModel.findById(userId);
    user.email = data.email;

    // Only set the password if it was modified
    if(data.password) {
      user.password = data.password;
    }

    return user.save();
  }

  static async remove(userId) {
    return UserModel.findByIdAndDelete(userId);
  }
}

module.exports = UserService;
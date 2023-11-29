const User = require('../models/user.model');

exports.createUser = async (req, res) => {
  const { name, email, pwd, role } = req.body;

  try {
    const existingUser = await User.findOne({ email, role });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        data: null,
        msg: 'User already exists',
      });
    }

    let rate = 0;

    if (role === 'member') {
      rate = 20;
    }

    const newUser = new User({ name, email, pwd, role, rate });
    await newUser.save();

    res.status(201).json({
      status: true,
      data: newUser,
      msg: 'Successfully registered.',
    });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({
      status: false,
      data: null,
      msg: 'Internal Server Error',
    });
  }
};

exports.getAllUsers = async (req, res) => {
  // Implementation for getting all users
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  // Implementation for getting a user by ID
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  // Implementation for updating a user
  const { name, email, pwd, role, rate } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.pwd = pwd || user.pwd;
    user.role = role || user.role;
    user.rate = rate || user.rate;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  // Implementation for deleting a user
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
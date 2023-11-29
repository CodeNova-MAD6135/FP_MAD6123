const User = require('../models/user');

exports.loginUser = async(req,res) => {
  const {email, pwd} = req.body;

  try{
    const user = await User.findOne({email});

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Check if the password matches
    if (pwd !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Successful login
    res.json({ message: 'Login successful', data: user });
  }
  catch(error){
    res.status(400).json({message: error.message});
  }
}

exports.createUser = async (req, res) => {
  // Implementation for creating a new user
  const { name, email, pwd, role } = req.body;

  try {

    const user = await User.findOne({email});
    if (user.role === role) {
      return res.status(401).json({ message: 'User with same role already exists' });
    }

    const newUser = new User({ name, email, pwd, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
  const { name, email, pwd, role } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.email = email;
    user.pwd = pwd;
    user.role = role;

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
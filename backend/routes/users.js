const express = require('express');
const router = express.Router();
const Controller = require('../controllers/userController');
const User = require('../models/User'); // Make sure to provide the correct path to your User model

// Route to get all users
router.get('/users', Controller.getAllUsers);

// Route to get a specific user by ID
router.get('/users/:id', Controller.getUserById);

// Route to create a new user
router.post('/users', Controller.createUser);

// Route to update a user by ID
router.patch('/users/:id', Controller.updateUser);

// Route to delete a user by ID
router.delete('/users/:id', Controller.deleteUser);

module.exports = router;

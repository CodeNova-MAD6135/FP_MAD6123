const express = require('express');
const router = express.Router();
const Controller = require('../controllers/userController');
const User = require('../models/user.model'); // Make sure to provide the correct path to your User model

// Route to get all users
router.get('/', Controller.getAllUsers);

// Route to get a specific user by ID
router.get('/:id', Controller.getUserById);

// Route to create a new user
router.post('/add', Controller.createUser);

// Route to update a user by ID
router.patch('/:id', Controller.updateUser);

// Route to delete a user by ID
router.delete('/:id', Controller.deleteUser);

module.exports = router;

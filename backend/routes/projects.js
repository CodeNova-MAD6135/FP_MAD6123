const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); // Make sure to provide the correct path to your Project model
const Controller = require('../controllers/projectController');

// Projects Routes

// Route to get projects for a specific admin
router.get('/projects/:adminId', Controller.getProjectsByAdminID);

// Route to get a specific project by ID
router.get('/projects/:id', Controller.getProjectById);

// Route to create a new project
router.post('/projects', Controller.createProject);

// Route to update a project by ID
router.patch('/projects/:id', Controller.updateProject);

// Route to delete a project by ID
router.delete('/projects/:id', Controller.deleteProject);


module.exports = router;

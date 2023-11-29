const express = require('express');
const router = express.Router();
const Project = require('../models/project.model'); // Make sure to provide the correct path to your Project model
const Controller = require('../controllers/projectController');

// Projects Routes

// Route to get projects for a specific admin
router.get('/', Controller.getMyProjectList);

// Route to get a specific project by ID
router.get('/:id', Controller.getProjectById);

// Route to create a new project
router.post('/add', Controller.addNewProject);

// Route to update a project by ID
router.patch('/:id', Controller.updateProject);

// Route to delete a project by ID
router.delete('/:id', Controller.deleteProject);


module.exports = router;

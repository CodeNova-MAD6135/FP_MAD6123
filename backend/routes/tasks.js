const express = require('express');
const router = express.Router();
const Controller = require('../controllers/taskController');
const Project = require('../models/Project');

// Tasks Routes
// Route to get all tasks for a specific project
router.get('/projects/:projectId/tasks', Controller.getTasksByProjectID);

// Route to create a new task for a specific project
router.post('/projects/:projectId/tasks', Controller.createTask);
  
  // Route to update a task for a specific project
router.patch('/projects/:projectId/tasks/:taskId', Controller.updateTask);
  
// Route to delete a task for a specific project
router.delete('/projects/:projectId/tasks/:taskId', Controller.deleteTask);

module.exports = router;
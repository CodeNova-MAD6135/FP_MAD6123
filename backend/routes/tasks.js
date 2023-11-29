const express = require('express');
const router = express.Router();
const Controller = require('../controllers/taskController');

// Tasks Routes
// Route to get all tasks for a specific project
router.get('/:projectId/tasks', Controller.getTasksByProjectID);

// Route to create a new task for a specific project
router.post('/:projectId/tasks', Controller.addProjectTask);
  
  // Route to update a task for a specific project
router.patch('/:projectId/tasks/:taskId', Controller.updateTask);
  
// Route to delete a task for a specific project
router.delete('/:projectId/tasks/:taskId', Controller.deleteTask);

module.exports = router;
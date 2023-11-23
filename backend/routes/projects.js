const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); // Make sure to provide the correct path to your Project model

// Projects Routes

// Route to get projects for a specific admin
router.get('/projects/:adminId', async (req, res) => {
    try {
      const adminId = req.params.adminId;
  
      // Find projects where the adminId matches
      const projects = await Project.find({ adminId });
      
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Route to get a specific project by ID
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new project
router.post('/projects', async (req, res) => {
  const { projectId, adminId, tasks } = req.body;

  try {
    const newProject = new Project({ projectId, adminId, tasks });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to update a project by ID
router.patch('/projects/:id', async (req, res) => {
  const { projectId, adminId, tasks } = req.body;

  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.projectId = projectId;
    project.adminId = adminId;
    project.tasks = tasks;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a project by ID
router.delete('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.remove();
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tasks Routes

// Route to get all tasks for a specific project
router.get('/projects/:projectId/tasks', async (req, res) => {
  try {
    const project = await Project.findOne({ projectId: req.params.projectId });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project.tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new task for a specific project
router.post('/projects/:projectId/tasks', async (req, res) => {
  const { taskId, startDate, endDate, completionHours, status } = req.body;

  try {
    const project = await Project.findOne({ projectId: req.params.projectId });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const newTask = {
      taskId,
      startDate,
      endDate,
      completionHours,
      status,
    };

    project.tasks.push(newTask);
    await project.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to update a task for a specific project
router.patch('/projects/:projectId/tasks/:taskId', async (req, res) => {
  const { startDate, endDate, completionHours, status } = req.body;

  try {
    const project = await Project.findOne({ projectId: req.params.projectId });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const task = project.tasks.find((t) => t.taskId == req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.startDate = startDate;
    task.endDate = endDate;
    task.completionHours = completionHours;
    task.status = status;

    await project.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a task for a specific project
router.delete('/projects/:projectId/tasks/:taskId', async (req, res) => {
  try {
    const project = await Project.findOne({ projectId: req.params.projectId });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.tasks = project.tasks.filter((task) => task.taskId != req.params.taskId);
    await project.save();

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

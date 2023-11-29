const Project = require('../models/project.model');

exports.addProjectTask = async (req, res) => {
  // Implementation for creating a new taks
  const { taskName, taskDescription, startDate, endDate, completionHours, status } = req.body;
  
    try {
      const project = await Project.findOne({ _id: req.params.projectId });
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      const newTask = {
        taskName,
        taskDescription,
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
};

exports.getAllTasks = async (req, res) => {
  // Implementation for getting all tasks
};

exports.getTasksByProjectID = async (req,res) => {
  //get all tasks for a specific project
  try {
    const project = await Project.findOne({ projectId: req.params.projectId });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project.tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getTaskById = async (req, res) => {
  // Implementation for getting a task by ID
  
};

exports.updateTask = async (req, res) => {
  // Implementation for updating a task
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
};

exports.deleteTask = async (req, res) => {
  // Implementation for deleting a task
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
};
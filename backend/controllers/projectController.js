const Project = require('../models/project.model');

exports.addNewProject = async (req, res) => {
  // Implementation for creating a new project
  const { projectId, adminId, projectName, projectDescription, tasks } = req.body;

  try {
    const newProject = new Project({ projectId, adminId, projectName, projectDescription, tasks });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getMyProjectList = async (req, res) => {
  try {
    // Find all projects
    const projects = await Project.find();

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  // Implementation for getting a project by ID
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  // Implementation for updating a project
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
};

exports.deleteProject = async (projectId) => {
  try {
    // Delete the project from MongoDB
    await Project.deleteOne({ projectId });

    console.log('Project deleted successfully.');
  } catch (error) {
    throw error; // Rethrow the error for handling in the route
  }
};
const Project = require('../models/project');

exports.createProject = async (req, res) => {
  // Implementation for creating a new project
  const { projectId, adminId, tasks } = req.body;

  try {
    const newProject = new Project({ projectId, adminId, tasks });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  // Implementation for getting all projects
};


exports.getProjectsByAdminID = async(req,res) => {
  // get projects for a specific admin
  try {
    const adminId = req.params.adminId;

    // Find projects where the adminId matches
    const projects = await Project.find({ adminId });
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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

exports.deleteProject = async (req, res) => {
  // Implementation for deleting a project
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
};
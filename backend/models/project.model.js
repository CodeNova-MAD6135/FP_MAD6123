const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskId: {
    type: Number,
    required: true,
    unique: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  completionHours: {
    type: Number,
  },
  status: {
    type: String,
  },
}, {
  timestamps: true,
});

const projectSchema = new mongoose.Schema({
  projectId: {
    type: Number,
    required: true,
    unique: true,
  },
  adminId: {
    type: Number,
    required: true,
  },
  tasks: [taskSchema],
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

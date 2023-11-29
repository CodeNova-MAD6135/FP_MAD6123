const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
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
  projectName: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
  },
  adminId: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],
}, {
  timestamps: true,
});

projectSchema.set('toJSON', {
  transform: function (doc, ret) {
    // remove the _id and __v fields
    delete ret._id;
    delete ret.__v;
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}`;

// Project schema and model
const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    year: { type: Number, required: true },
    link: { type: String }
  },
  { collection: "projects" }
);

const Project = mongoose.model("Project", ProjectSchema);

// Connect to MongoDB
async function connect() {
  await mongoose.connect(dbUrl);
}

// Initialize some sample projects in the DB
async function initializeProjects() {
  const projectList = [
    {
      title: "Sample Project 1",
      description: "Description for project 1",
      year: 2023,
      link: "http://example.com/project1"
    },
    {
      title: "Sample Project 2",
      description: "Description for project 2",
      year: 2022,
      link: "http://example.com/project2"
    }
  ];
  await Project.insertMany(projectList);
}

// Add a new project to the database
async function addProject(title, description, year, link) {
  const newProject = new Project({
    title,
    description,
    year,
    link
  });
  await newProject.save();
}

// Get all projects from the database
async function getProjects() {
  await connect();
  return await Project.find({});
}

// Export functions
module.exports = {
  initializeProjects,
  addProject,
  getProjects
};

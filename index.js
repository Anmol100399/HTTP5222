const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// CORS should be set before routes to allow cross-origin requests
app.use(cors());

const projectDb = require("./modules/project");
const skillDb = require("./modules/skill");

const port = process.env.PORT || "8888";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

// Home Route: Fetches and renders latest project and skill
app.get("/", async (request, response) => {
  try {
    let projectList = await projectDb.getProjectsSorted();
    let skillList = await skillDb.getSkillsSorted();

    if (!projectList.length) {
      await projectDb.initializeProjects();
      projectList = await projectDb.getProjectsSorted();
    }

    if (!skillList.length) {
      await skillDb.initializeSkills();
      skillList = await skillDb.getSkillsSorted();
    }

    // Get only the most recent project and skill
    projectList = projectList[0]; // Get the latest project
    skillList = skillList[0]; // Get the latest skill

    response.render("index", { projects: projectList, skills: skillList });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "Failed to fetch data" });
  }
});

// Projects Route: Fetches and returns all projects
app.get("/projects", async (request, response) => {
  try {
    let projectList = await projectDb.getProjects();

    if (!projectList.length) {
      await projectDb.initializeProjects();
      projectList = await projectDb.getProjects();
    }

    // Get only the most recent project
    projectList = projectList.slice(-1);

    response.json({ projects: projectList });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Skills Route: Fetches and returns all skills
app.get("/skills", async (request, response) => {
  try {
    let skillList = await skillDb.getSkills();

    if (!skillList.length) {
      await skillDb.initializeSkills();
      skillList = await skillDb.getSkills();
    }

    // Get only the most recent skill
    skillList = skillList.slice(-1);

    response.json({ skills: skillList });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "Failed to fetch skills" });
  }
});

// Add Skill Route: Adds a new skill and renders the detail page
app.post("/add-skill", async (req, res) => {
  try {
    const { name, proficiency } = req.body;
    await skillDb.addSkill(name, proficiency);
    res.redirect("/skills");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding skill");
  }
});

// Add Project Route: Adds a new project and renders the detail page
app.post("/add-project", async (req, res) => {
  try {
    const { title, description, year, link } = req.body;
    await projectDb.addProject(title, description, year, link);
    res.redirect("/projects");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding project");
  }
});

// API Route: Fetches all projects and skills
app.get("/api", async (request, response) => {
  try {
    const projectList = await projectDb.getProjects();
    const skillList = await skillDb.getSkills();
    response.json({ projects: projectList, skills: skillList });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "Failed to fetch API data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

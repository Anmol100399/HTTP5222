const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

const projectDb = require("./modules/project");
const skillDb = require("./modules/skill");
const contactDb = require("./modules/contact");  // Import contact.js

const app = express();
const port = process.env.PORT || "8888";

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST'] }));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  let projectList = await projectDb.getProjects();
  let skillList = await skillDb.getSkills();

  if (!projectList.length) {
    await projectDb.initializeProjects();
    projectList = await projectDb.getProjects();
  }

  if (!skillList.length) {
    await skillDb.initializeSkills();
    skillList = await skillDb.getSkills();
  }

  projectList = projectList.slice(-1);
  skillList = skillList.slice(-1);

  res.render("index", { projects: projectList, skills: skillList });
});

app.get("/projects", async (req, res) => {
  let projectList = await projectDb.getProjects();

  if (!projectList.length) {
    await projectDb.initializeProjects();
    projectList = await projectDb.getProjects();
  }

  projectList = projectList.slice(-1);
  res.json({ projects: projectList });
});

app.get("/skills", async (req, res) => {
  let skillList = await skillDb.getSkills();

  if (!skillList.length) {
    await skillDb.initializeSkills();
    skillList = await skillDb.getSkills();
  }

  skillList = skillList.slice(-1);
  res.json({ skills: skillList });
});

app.post("/add-skill", async (req, res) => {
  const { name, proficiency, category, yearsExperience } = req.body;
  await skillDb.addSkill(name, proficiency, category, yearsExperience);
  res.render("detail", { type: "Skill", data: req.body });
});

app.post("/add-project", async (req, res) => {
  const { title, description, year, link, languages, image } = req.body;
  await projectDb.addProject(title, description, year, link, languages, image);
  res.render("detail", { type: "Project", data: req.body });
});

// Modify the /contact route to use contactDb
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Save the contact form data to the database
  await contactDb.addContact(name, email, message);

  res.render("detail", { type: "Contact", data: req.body });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
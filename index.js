const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require('cors');
app.use(cors());

dotenv.config();

const projectDb = require("./modules/project");
const skillDb = require("./modules/skill");

const app = express();
const port = process.env.PORT || "8888";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (request, response) => {
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
//  got it from w3school.com, how to get only one recently added details
  projectList = projectList.slice(-1);
  skillList = skillList.slice(-1);

  response.render("index", { projects: projectList, skills: skillList });
});
app.get("/projects", async (request, response) => {
  let projectList = await projectDb.getProjects();

  if (!projectList.length) {
    await projectDb.initializeProjects();
    projectList = await projectDb.getProjects();
  }
  projectList = projectList.slice(-1);

  response.json({ projects: projectList});

});
app.get("/skills", async (request, response) => {
  let skillList = await skillDb.getSkills();

  if (!skillList.length) {
    await skillDb.initializeSkills();
    skillList = await skillDb.getSkills();
  }
  skillList = skillList.slice(-1);

  response.json({skills: skillList });
});

app.post("/add-skill", async (req, res) => {
  const { name, proficiency } = req.body;
  await skillDb.addSkill(name, proficiency);
  res.render("detail", { type: 'Skill', data: { name, proficiency } });
});

app.post("/add-project", async (req, res) => {
  const { title, description, year, link } = req.body;
  await projectDb.addProject(title, description, year, link);
  res.render("detail", { type: 'Project', data: { title, description, year, link } });
});

app.get("/api", async (request, response) => {
  const projectList = await projectDb.getProjects();
  const skillList = await skillDb.getSkills();
  response.json({ projects: projectList, skills: skillList });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
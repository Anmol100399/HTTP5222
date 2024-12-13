const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}`;

// Skill schema and model with additional fields for category and years of experience
const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    proficiency: { type: String }, // e.g., Beginner, Intermediate, Advanced
    category: { type: String }, // e.g., Frontend, Backend, Tools
    yearsOfExperience: { type: Number } // Number of years of experience
  },
  { collection: "skills" }
);

const Skill = mongoose.model("Skill", SkillSchema);

// Connect to MongoDB
async function connect() {
  await mongoose.connect(dbUrl);
}

// Initialize some sample skills in the DB with additional fields
async function initializeSkills() {
  const skillList = [
    {
      name: "JavaScript",
      proficiency: "Advanced",
      category: "Frontend",
      yearsOfExperience: 5
    },
    {
      name: "Node.js",
      proficiency: "Intermediate",
      category: "Backend",
      yearsOfExperience: 3
    },
    {
      name: "HTML & CSS",
      proficiency: "Advanced",
      category: "Frontend",
      yearsOfExperience: 4
    }
  ];
  await Skill.insertMany(skillList);
}

// Add a new skill to the database with additional fields
async function addSkill(name, proficiency, category, yearsOfExperience) {
  const newSkill = new Skill({
    name,
    proficiency,
    category,
    yearsOfExperience
  });
  await newSkill.save();
}

// Get all skills from the database
async function getSkills() {
  await connect();
  return await Skill.find({});
}

// Export functions
module.exports = {
  initializeSkills,
  addSkill,
  getSkills
};

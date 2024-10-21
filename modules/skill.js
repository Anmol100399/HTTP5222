const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}`;

// Skill schema and model
const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    proficiency: { type: String } // e.g., Beginner, Intermediate, Advanced
  },
  { collection: "skills" }
);

const Skill = mongoose.model("Skill", SkillSchema);

// Connect to MongoDB
async function connect() {
  await mongoose.connect(dbUrl);
}

// Initialize some sample skills in the DB
async function initializeSkills() {
  const skillList = [
    {
      name: "JavaScript",
      proficiency: "Advanced"
    },
    {
      name: "Node.js",
      proficiency: "Intermediate"
    },
    {
      name: "HTML & CSS",
      proficiency: "Advanced"
    }
  ];
  await Skill.insertMany(skillList);
}

// Add a new skill to the database
async function addSkill(name, proficiency) {
  const newSkill = new Skill({
    name,
    proficiency
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

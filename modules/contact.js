const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}`;

// Contact schema and model
const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
  },
  { collection: "contacts" }
);

const Contact = mongoose.model("Contact", ContactSchema);

// Connect to MongoDB
async function connect() {
  await mongoose.connect(dbUrl);
}

// Add a new contact message to the database
async function addContact(name, email, message) {
  const newContact = new Contact({
    name,
    email,
    message
  });
  await newContact.save();
}

// Get all contact messages
async function getContacts() {
  await connect();
  return await Contact.find({});
}

// Export functions
module.exports = {
  addContact,
  getContacts
};
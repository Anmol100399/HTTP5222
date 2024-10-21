# Portfolio Manager Web App

A simple web application to manage projects and skills. Users can add projects and skills, and the latest entries will be displayed on the homepage. This project demonstrates the use of Node.js, Express, MongoDB (with Mongoose), and Pug for templating.

## Features

- Add new projects and skills through forms.
- Display the most recent project and skill after submission.
- API endpoint to retrieve all projects and skills in JSON format.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Templating Engine**: Pug
- **CSS**: Flexbox for layout
- **Environment Variables**: dotenv

## Project Structure

```
.
├── modules/
│   ├── project.js   # Module for managing projects
│   └── skill.js     # Module for managing skills
├── public/
│   └── css/
│       └── styles.css   # Styles for the project
├── views/
│   ├── index.pug    # Main page for adding projects and skills
│   └── detail.pug   # Page displaying details in API format
├── .env             # Environment variables
├── index.js         # Main application file
├── README.md        # Project documentation
└── package.json     # Project dependencies
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v14 or higher
- [MongoDB](https://www.mongodb.com/) installed locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/portfolio-manager.git
   cd portfolio-manager
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/myportfolio
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open the application in your browser:
   ```
   http://localhost:8888
   ```

## API Endpoints

- `GET /api`: Retrieve all projects and skills in JSON format.

## Folder Structure

- **/modules**: Contains the `project.js` and `skill.js` modules to interact with the MongoDB database.
- **/views**: Contains Pug templates for the application.
- **/public**: Static files, such as the `styles.css`, are stored here.

## Usage

1. Navigate to the homepage.
2. Use the forms to add a new project or skill.
3. The most recent project and skill will be displayed on the homepage after submission.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

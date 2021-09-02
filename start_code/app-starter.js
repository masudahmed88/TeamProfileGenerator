const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Rendering function
// const render = require("./lib/htmlRenderer");
// Alternative rendering function
const render = require("./lib/page-template.js");

const teamMembers = [];
// Create an id array to store the ids.
// This array will be used to check the potential duplicate id newly entered by user
const idArray = [];

function appMenu() {
  //create manager first, then from manager we will create a team
  //oncemanager is created, we will create team by asking the user which type of employee to create
  //based on the choice, we will createthat employee object
  //Loop through the create team function until user is done from creating employees for the team
  // then we willuse the employee objects created to build a team
  function createManager() {
    console.log("Please build your team");
    inquirer
      .prompt([
        // YOUR CODE HERE:
        // CREATE OBJECTS OF QUESTIONS HERE FOR MANAGER
        // Strongly recommend to add validate property function for id and email
        { 
          type: "input", 
          name: "managerName", 
          message: "What is your name?" 
        },
        { 
          type: "input", 
          name: "managerId", 
          message: "What is your ID?" 
        },
        { 
          type: "input", 
          name: "managerEmail", 
          message: "What is your email?" 
        },
        { 
          type: "input", 
          name: "managerOfficeNumber", 
          message: "What is your office number?" 
        }
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members",
          ]
        }
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        //
        // YOUR CODE HERE
        // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
        //
        { 
          type: "input", 
          name: "engineerName", 
          message: "What is your engineer's name?" 
        },
        { 
          type: "input", 
          name: "engineerId", 
          message: "What is the engineer's ID?" 
        },
        { 
          type: "input", 
          name: "engineerEmail", 
          message: "What is the engineer's email?" 
        },
        { 
          type: "input", 
          name: "gitHub", 
          message: "What is the engineer's github account?" 
        }
      ])
      .then((answers) => {
        //
        // YOUR CODE HERE
        // 1. CREATE A VARIABLE TO STORE THE ENGINEER OBJECT INSTANTIATED WITH THE ENGINEER CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS
        //    TO THE ENGINEER CLASS CONSTRUCTOR
        // 2. ADD (PUSH) THE ENGINEER VARIABLE TO the teamMembers ARRAY
        // 3. ADD (PUSH) THE ENGINERR ID TO THE idArray ARRAY
        //
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.gitHub
        );
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        //
        // YOUR CODE HERE
        // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
        //
        { 
          type: "input", 
          name: "internName", 
          message: "What is your intern's name?" 
        },
        { 
          type: "input", 
          name: "internId", 
          message: "What is the intern's ID?" 
        },
        { 
          type: "input", 
          name: "internEmail", 
          message: "What is the intern's email?" 
        },
        { 
          type: "input", 
          name: "school", 
          message: "What school did the intern go to?" 
        }
      ])
      .then((answers) => {
        //
        // YOUR CODE HERE
        // 1. CREATE A VARIABLE TO STORE THE INTERN OBJECT INSTANTIATED WITH THE INTERN CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS
        //    TO THE INTERN CLASS CONSTRUCTOR
        // 2. ADD (PUSH) THE INTERN VARIABLE TO the teamMembers ARRAY
        // 3. ADD (PUSH) THE INTERN ID TO THE idArray ARRAY
        //
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.school
        );
        teamMembers.push(intern);
        idArray.push(answers.internId);
        createTeam();
      });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();
}

appMenu();

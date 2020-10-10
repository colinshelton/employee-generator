const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const questions = [
  {
    type: "input",
    name: "name",
    message: "enter the name of the team member",
  },
  {
    type: "input",
    name: "id",
    message: "enter their employee ID",
  },
  {
    type: "input",
    name: "email",
    message: "enter the email of the team member",
  },
  {
    type: "list",
    name: "role",
    message: "What is the role of the team member?",
    choices: ["engineer", "intern", "manager"],
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is the team member office number?",
    validate: function (value) {
      var valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
    },
    filter: Number,
    when: function (answers) {
      return answers.role === "manager";
    },
  },
  {
    type: "input",
    name: "github",
    message: "enter the engineer github username",
    when: function (answers) {
      return answers.role === "engineer";
    },
  },
  {
    type: "input",
    name: "school",
    message: "Enter the school of the intern",
    when: function (answers) {
      return answers.role === "intern";
    },
  },
  {
    type: "confirm",
    name: "askAgain",
    message: "Want to enter another team member (just hit enter for YES)?",
    default: true,
  },
];

// array containing all employee objects
let employees = [];

const askAgain = function () {
  inquirer
    .prompt(questions)
    .then((answers) => {
      if (!answers.askAgain) {
        if (answers.role === "manager") {
          let manager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            answers.officeNumber
          );
          employees.push(manager);
        }
        if (answers.role === "engineer") {
          let engineer = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.github
          );
          employees.push(engineer);
        }
        if (answers.role === "intern") {
          let intern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            answers.school
          );
          employees.push(intern);
        }
        console.log("Your team members include:", employees.join(", "));
        let employeeHTML = render(employees);
        fs.writeFileSync("./output/team.html", employeeHTML);
      } else {
        askAgain();
        //console.log(globalThis);
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // prompt cannot be rendered
      } else {
        // something else went wrong
      }
      console.log(error);
    });
};
askAgain();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// ADDED FROM GOOD README
// function writeToTeam(html) {
//   fs.writeFilySync("./output/team.html", html);
// }

// async function init() {
//   try {
//     inquirer.prompt(questions).then(async (answers) => {
//       const html = await ask();
//       writeToTeam(html);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

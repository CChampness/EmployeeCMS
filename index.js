// This is a command-line application to access a dabase.
// The database keeps track of employess, departments, and roles
// within an organization.
// To install the app, use the following procedure:
//   1. first run "npm i"
//   2. log into mysql
//   3. at the mysql prompt, type "source db/schema.sql"
//   4. at the mysql prompt, type "source db/seeds.sql"
// To run the app in bash, type "node index"

// Options:
// 1. view all departments
//   Show a formatted table showing 
//     - department names
//     - department ids
// 2. view all roles
//   Show
//     - job title
//     - role id
//     - department that the role belongs to
//     - salary for that role
// 3. view all employees
//   Show a formatted table
//     - employee id
//     - first name
//     - last name
//     - job title
//     - department
//     - salary
//     - manager that the employee reports to
// 4. add a department
//   Prompt to enter the following data:
//     - name of the department
//     - Then show that the department is added to the database
// 5. add a role
//   Prompt to enter the following data:
//     - name
//     - salary
//     - department for the role
//     - Then show that the role is added to the database
// 6. add an employee
//   Prompt to enter the following data:
//     - employee’s first name, last name
//     - role
//     - manager
//     - Then show that the employee is added to the database
// 7. update an employee role
//   Prompt to select an employee 
//     - update their new role
//     - Then show that this information is updated in the database
//////////////////////////////////////////////////////////////

const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require("mysql2");
const cTab = require("console.table");

const db = mysql.reateConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employees_db"
});

// Array of questions for user input
const userQuestions = [
    {
      type: 'input',
      name: 'empname',
      message: 'What is this employee\'s name?',
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is this employee\'s id?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is this employee\'s email?',
    },
    {
      type: 'input',
      name: 'more',
      message: 'Enter another employee? (y/n)',
    }
  ]
  
const menuInputs = async (inputs = []) => {
  const menuQuestions = [
    {
      type: 'list',
      message: 'Which employee would you like to add next?',
      name: 'empType',
      choices: ['Manager', 'Engineer', 'Intern'],
    },
  ];
  
  const { more, ...answers } = await inquirer.prompt(menuQuestions);
  const newInputs = [...inputs, answers];
  return more ? menuInputs(newInputs) : newInputs;
};
  
const mainMenu = async () => {
    const inputs = await menuInputs();
    switch (inputs[0].empType) {
      case "Manager": 
        getManagerProfile();
      break;
      case "Engineer":
        getEngineerProfile();
      break;
      case "Intern":
        getInternProfile();
      break;
    }
  };
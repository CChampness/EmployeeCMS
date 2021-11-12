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
//   Shows formatted table showing 
//     - department names
//     - department ids
// 2. view all roles
//   Shows 
//     - job title
//     - role id
//     - department that the role belongs to
//     - salary for that role
// 3. view all employees
//   Shows a formatted table
//     - employee ids
//     - first names, last names
//     - job titles
//     - departments
//     - salaries
//     - managers that the employees report to
// 4. add a department
//   Prompt to enter
//     - name of the department
//     - Show that the department is added to the database
// 5. add a role
//   Prompt to enter
//     - name
//     - salary
//     - department for the role
//     - Show that the role is added to the database
// 6. add an employee
//   Prompt to enter
//     - employee’s first name, last name
//     - role
//     - manager
//     - Show that the employee is added to the database
// 7. update an employee role
//   Prompt to select an employee 
//     - update their new role
//     - Show that this information is updated in the database
//////////////////////////////////////////////////////////////

const inquirer = require('inquirer');
const fs = require('fs');


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
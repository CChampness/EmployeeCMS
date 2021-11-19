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
const mysql = require("mysql2");
const db = require("./lib/db");
const cTab = require("console.table");
const { exit } = require('process');
const addEmployee = require("./lib/addEmployee");
const updateEmployee = require("./lib/updateEmployee");
const addRole = require("./lib/addRole");

userMain = () => {
  inquirer.prompt([{
    type: 'list',
    message: 'What would you like to do?',
    name: 'userOption',
    choices: [
      'View all employees',
      'View all roles',
      'View all departments',
      'Add an employee',
      'Add a role',
      'Add a department',
      'Update an employee\'s role',
      'Quit'
    ],
  }]).then((answers) => {
    switch (Object.values(answers)[0]) {
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Update an employee\'s role':
        updateEmployee();
        break;
      case 'Quit':
        exit();
        break;
    }
  });
}

function viewAllEmployees() {
  db.query(`SELECT employees.id AS "Employee ID", employees.first_name, employees.last_name, roles.title AS "Title", dept_name AS "Department", salary,
            CONCAT( manager.first_name, " ", manager.last_name) as Manager
            FROM ((roles
            JOIN employees ON employees.role_id = roles.id)
            JOIN departments ON departments.id = roles.department_id)
            LEFT JOIN employees manager ON employees.manager_id = manager.id
            ORDER BY employees.id`,
    (err, result) => {
      if (err) throw err;
      console.log(`\n`);
      console.table(result);
      userMain();
    })
}

function viewAllRoles() {
  db.query(`SELECT roles.id AS "Role ID", title, departments.dept_name, salary FROM roles
            JOIN departments ON departments.id = roles.department_id`,
    (err, result) => {
      if (err) throw err;
      console.log(`\n`);
      console.table(result);
      userMain();
    })
}

function viewAllDepartments() {
  db.query("SELECT id, dept_name AS Department FROM departments",
    (err, result) => {
      if (err) throw err;
      console.log(`\n`);
      console.table(result);
      userMain();
    });
}

//NOTES: not every employee has a manager.
// Managers are not tied to departments.
// Pseudo code in a channel

addDepartment = () => {
  inquirer.prompt([{
    type: 'input',
    name: 'department',
    message: 'What is the new department?'
  }]).then((answers) => {
    userMain();
    db.query(`INSERT INTO departments (dept_name)
              VALUES ("${answers.department}")`, function (err, result, fields) {
      if (err) throw err;
    })
  })
}

userMain();
const inquirer = require('inquirer');
const db = require("./db");

// Add employee
//  Prompt to enter the following data:
//    - employee’s first name, last name
//    - role
//    - manager
//    - Then show that the employee is added to the database

addEmployee = () => {
  let roleNames = [];
  let employeeNames = [];
  db.query(
    `SELECT id, title FROM roles`,
    (err, result) => {
      if (err) throw err;
      for (let index = 0; index < result.length; index++) {
        roleNames.push(result[index].title);
      }

      db.query(
        `SELECT employees.id, CONCAT(employees.first_name, " ", employees.last_name) as "ManagerName"
        FROM employees
        WHERE employees.id = employees.manager_id`,
        (err, result) => {
          if (err) throw err;
          for (let index = 0; index < result.length; index++) {
            employeeNames.push(result[index].ManagerName);
          }

          inquirer.prompt([{
            type: 'input',
            name: 'employeeFirstName',
            message: 'What is the first name of this employee?',
          },
          {
            type: 'input',
            name: 'employeeLastName',
            message: 'What is the last name of this employee?',
          },
          {
            type: 'list',
            name: 'employeeRole',
            message: 'What role is this employee in?',
            choices: roleNames
          },
          {
            type: 'list',
            name: 'employeeManager',
            message: 'Who is the employees manager?',
            choices: employeeNames
          }
          ]).then((answers) => {
            mgrFirst = answers.employeeManager.split(" ")[0];
            mgrLast = answers.employeeManager.split(" ")[1];
            db.query(
              `SELECT DISTINCT id FROM roles WHERE title = "${answers.employeeRole}"`,
              (err, roleID) => {
                roleID = Object.values(roleID[0]);
                // Converting manager assignment into employee id
                db.query(
                  `SELECT id FROM employees WHERE first_name = "${mgrFirst}" AND last_name = "${mgrLast}"`,
                  (err, employeeID) => {
                    employeeID = Object.values(employeeID[0]);
                    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
                      [answers.employeeFirstName, answers.employeeLastName, roleID, employeeID],
                      (err, result) => {
                        if (err) throw err;
                        userMain();
                      }
                    )
                  })
              })
          })
        })
    })
};

module.exports = addEmployee

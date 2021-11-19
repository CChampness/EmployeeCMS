const inquirer = require('inquirer');
const db = require("./db");

updateEmployee = () => {
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
        `SELECT employees.id, CONCAT(employees.first_name, " ", employees.last_name) as "employeeNames"
        FROM employees`,
        (err, result) => {
          if (err) throw err;
          for (let index = 0; index < result.length; index++) {
            employeeNames.push(result[index].employeeNames);
          }

          inquirer.prompt([{
            type: 'list',
            name: 'employeeName',
            message: 'Which employee to update?',
            choices: employeeNames
          },
          {
            type: 'list',
            name: 'roleTitle',
            message: 'What is the new role for this employee?',
            choices: roleNames
          }
          ]).then((answers) => {
            empFirst = answers.employeeName.split(" ")[0];
            empLast = answers.employeeName.split(" ")[1];
            db.query(
              `SELECT DISTINCT id FROM roles WHERE title = "${answers.roleTitle}"`,
              (err, roleID) => {
                roleID = Object.values(roleID[0]);
                // Convert employee name into employee id
                db.query(
                  `SELECT id FROM employees WHERE first_name = "${empFirst}" AND last_name = "${empLast}"`,
                  (err, employeeID) => {
                    employeeID = Object.values(employeeID[0]);
                    db.query(`UPDATE employees SET role_id = "${roleID}" WHERE id = "${employeeID}"`,
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

module.exports = updateEmployee

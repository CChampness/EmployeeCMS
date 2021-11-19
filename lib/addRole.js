const inquirer = require('inquirer');
const db = require("./db");

addRole = () => {
  console.log("addRole");
  let departmentNames = [];
  db.query(
    `SELECT id, dept_name FROM departments`,
    (err, result) => {
      // console.log("result: "+result);
      if (err) throw err;
      for (let index = 0; index < result.length; index++) {
        departmentNames.push(result[index].dept_name);
      }

      inquirer.prompt([{
        type: 'input',
        name: 'newRole',
        message: 'What is the name of the new role?',
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary for the new role?',
      },
      {
        type: 'list',
        name: 'departmentName',
        message: 'What department is this new role in?',
        choices: departmentNames
      },
      ]).then((answers) => {
        console.log("SELECT department: "+answers.departmentName);
        db.query(
          `SELECT DISTINCT id FROM departments WHERE dept_name = "${answers.departmentName}"`,
          (err, result) => {
            if (err) throw err;
                  console.log("SELECT result: "+result);

            let deptID = Object.values(result[0]);
            //
            db.query(`INSERT INTO ROLES (title, salary, department_id) VALUES (?,?,?)`,
              [answers.newRole, answers.roleSalary, deptID],
              (err, result) => {
                if (err) throw err;
                userMain();
              }
            )
          })
      })
    })
};

module.exports = addRole


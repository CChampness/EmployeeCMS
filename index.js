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
const { collectData, db } = require("./lib/db");
const cTab = require("console.table");
const refreshDatabase = require("./lib/refreshDB");
const displayRes = require("./lib/displayRes");
const { resolveSoa } = require('dns');
const { exit } = require('process');

/////////////////////////////////////////////////////
// Array of questions for manager user input
// const mgrInputs = async (inputs = []) => {
//   const mgrOptions = [
//     {
//       type: 'list',
//       name: 'manager',
//       choices: ["A", "B"],
//       message: 'Who is this employee\'s manager?',
//     }
//   ];

//   const { more, ...answers } = await inquirer.prompt(mgrOptions);
//   const newInputs = [...inputs, answers];
//   return more ? mgrInputs(newInputs) : newInputs;
// };

// const getMgr = async () => {
//   const inputs = await mgrInputs();
//   switch (inputs[0].userOption) {
//   }
//   return //something good;
// };

userMain = () => {
  collectData();
  inquirer.prompt([{
      type: 'list',
      message: 'What would you like to do?',
      name: 'userOption',
      choices: ['Refresh the database',
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
      console.log(Object.values(answers));
      switch (Object.values(answers)[0]) {
        // case 'Refresh the database':
        //   refreshDatabase();
        //   break;
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
          updateEmployeeRole();
          break;
        case 'Quit':
          exit();
          break;
      }
      // userMain();
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
    })
  userMain();
}

function viewAllRoles() {
  db.query(`SELECT roles.id AS "Role ID", title, departments.dept_name, salary FROM roles
            JOIN departments ON departments.id = roles.department_id`,
    (err, result) => {
      if (err) throw err;
      console.log(`\n`);
      console.table(result);
    })
    userMain();
  }

function viewAllDepartments() {
  db.query("SELECT id, dept_name AS Department FROM departments",
    (err, result) => {
      if (err) throw err;
      console.log(`\n`);
      console.table(result);
    });
    userMain();
  }

let roleList = "";
function addEmployee() {
//    Prompt to enter the following data:
//      - employee’s first name, last name
//      - role
//      - manager
//      - Then show that the employee is added to the database
  /////////////////////////////////////////////////////
  // Array of questions for role user input
  const roleInputs = function (inputs = []) {
    db.query(`SELECT DISTINCT title FROM roles`,
      (err, roleResults) => {
        if (err) throw err;
        roleList = roleResults.map((obj) => ({
          name: obj.title,
          value: obj.id,
        }));
        // // console.log(roleResults);
        console.log(roleList);
        // return roleList;
      }
    )

  console.log(roleList);
  roleInputs();
  // console.log(getRoles());
  const roleOptions = [
    {
      type: 'list',
      name: 'role',
      choices: roleList,
      message: 'What role does this employee have?',
    }
  ];

  const { more, ...answers } = inquirer.prompt(roleOptions);
  const newInputs = [...inputs, answers];
  return more ? roleInputs(newInputs) : newInputs;
};

// add role and mgr
db.query(`INSERT INTO employees (first_name, last_name, role_id)
          VALUES ("Jackson", "Rambucheau", (
          SELECT id
          FROM roles
          WHERE title = "Janitor")
        )`, function (err, result, fields) {
      if (err) throw err;
      console.log(`\n`);
      console.table(result);
    }
  )
}

function addRole() {
  db.query(`INSERT INTO roles (title, salary, department_id)
            VALUES ("Janitor", "21000", (
            SELECT departments.id
            FROM departments
            WHERE departments.dept_name = "Maintenance")
          )`, function (err, result, fields) {
      if (err) throw err;
      console.log(`\n`);
      console.table(result);
    }
  )
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

updateEmployeeRole = () => {
  let empList;
  db.query(`SELECT DISTINCT CONCAT(first_name, " ", last_name) AS emp
            FROM employees`, function (err, empRes, fields) {
      if (err) throw err;
      console.log(empRes);
      empList = empRes.map(obj => Object.values(obj)[0]);
      console.log(empList);
    })

  // let roleResult;
  // db.query(`SELECT DISTINCT roles.title FROM roles`, function (err, roleRes, fields) {
  //     if (err) throw err;
  //     roleResult = roleRes;
  //     console.log(roleResult);
  //   })

  // const roleList = roleResult.map(obj => Object.values(obj)[0]);
  // console.log(roleList);
  console.log("empList: "+empList);
  inquirer.prompt([{
    type: 'list',
    name: 'employee',
    message: 'Which employee do you want to update?',
    choices: empList
  },
//   {
//     type: 'list',
//     name: 'role',
//     message: 'Which role would you like them to change to?',
//     choices: roles
  // }
  ]).then(() => {
console.log("then: "+empList)
    // db.updateEmployee(employee, role);
    // init();
  })
};


userMain();
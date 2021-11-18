const inquirer = require('inquirer');
const db = require("./db");

// Add employee
//  Prompt to enter the following data:
//    - employee’s first name, last name
//    - role
//    - manager
//    - Then show that the employee is added to the database

getRoleList = () => {
  db.query(`SELECT id, title FROM roles`,
    (err, result) => {
    if (err) throw err;
    console.log(`\n`);
    console.table(result);
  })
}

getEmployeeList = () => {
  db.query(`SELECT employees.id, CONCAT(employees.first_name, " ", employees.last_name) as "ManagerName"
            FROM employees
            WHERE employees.id = employees.manager_id`,
    (err, result) => {
      if (err) throw err;
      console.log(`\nEmployee result: \n`);
      console.table(result);
      return result;
    }
  )
}

addEmployee = () => {
//  const roleInfo = getRoleList()
 const roleList = ["Sales", "Technician"];
  let employeeInfo = getEmployeeList();
  console.log(`\nEmployee Info: \n`);
  console.log(employeeInfo);
// const employeeList = employeeInfo.map(emp => emp);
//    console.log("employeeList: "+employeeList);
//  const employeeList = ["Yonah Zebul", "Bashemath Gemariah"];
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
          choices: roleList
        },
        {
          type: 'list',
          name: 'employeeManager',
          message: 'Who is the employees manager?',
          choices: employeeList
        }
      ]).then((answers) => {
          console.log(answers);
        // INSERT query goes here
      })
      console.log('exiting addEmployee');
};

  module.exports = addEmployee

const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employees_db"
});

const querySet = [
  "DROP DATABASE IF EXISTS employees_db",
  "CREATE DATABASE employees_db",
  "SHOW DATABASES",
  "USE employees_db",
  `CREATE TABLE departments
    ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, dept_name VARCHAR(30) NOT NULL)`,
  "SHOW TABLES",

  `CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL)`,

  `CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    manager_id INT
    REFERENCES employees(id))`,



 `INSERT INTO departments (dept_name) VALUES ("Service")`,
 `INSERT INTO departments (dept_name) VALUES ("Parts")`,
 `INSERT INTO departments (dept_name) VALUES ("Book Keeping")`,

 `INSERT INTO roles (title, salary, department_id) VALUES (
     "Manager",
     "50000",
     "1" )`,

 `INSERT INTO roles (title, salary, department_id) VALUES (
     "Book Keeper",
     "40000",
     "3" )`,

 `INSERT INTO roles (title, salary, department_id) VALUES (
     "Manager",
     "50000",
     "2")`,

 `INSERT INTO roles (title, salary, department_id) VALUES (
     "Sales",
     "21000",
     "1")`,

 `INSERT INTO roles (title, salary, department_id) VALUES (
     "Sales",
     "22000",
     "2")`,

 `INSERT INTO roles (title, salary, department_id) VALUES (
     "Technician",
     "31000",
     "1")`,

 `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (
     "Bashemath",
     "Gemariah",
     "1",
     "1")`,

 `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (
     "Ishbi-benob",
     "Onesimus",
     "2",
     "1")`,

 `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (
     "Yonah",
     "Zebul",
     "3",
     "3" )`,

 `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (
     "Teman",
     "Segub",
     "4",
     "1" )`,

 `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (
     "Rebekah",
     "Penuel",
     "5",
     "3" )`,

 `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (
     "Pelaliah",
     "Onesiphorus",
     "6",
     "3" )`,

 `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (
     "Mara",
     "Kirjath-sannah",
     "4",
     "1" )`,

 `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (
     "Javan",
     "Ishiah",
     "5",
     "3" )`,

 `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (
     "Hanani",
     "Elisheba",
     "6",
     "3" )`,

 `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (
     "Dishan",
     "Bathsuha",
     "4",
     "1" )`,

 `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (
     "Asshurim",
     "Gennesaret",
     "5",
     "3" )`,
];

function refreshDatabase() {
    console.log("refreshDatabase");
    querySet.forEach(query => db.query(query, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    }));
  };

module.exports = refreshDatabase;
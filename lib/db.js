const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employees_db"
  });
  
function collectData() {
  
}

module.db = db;
module.exports = { collectData, db }
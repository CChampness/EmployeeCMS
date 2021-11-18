
-- SELECT employees.id AS "Employee ID", employees.first_name, employees.last_name, roles.title AS "Title", dept_name AS "Department", salary,
--             CONCAT( manager.first_name, " ", manager.last_name) as Manager
--             FROM ((roles
--             JOIN employees ON employees.role_id = roles.id)
--             JOIN departments ON departments.id = roles.department_id)
--             LEFT JOIN employees manager ON employees.manager_id = manager.id
--             ORDER BY employees.id;

-- SELECT CONCAT(employees.first_name, " ", employees.last_name) AS Manager
-- FROM employees
-- WHERE employees.manager_id = employees.id;

-- SELECT DISTINCT employees.id, CONCAT(first_name, " ", last_name)
-- FROM employees;

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (
    "j", "b",
  (SELECT id FROM roles WHERE title = "Sales"),
  (SELECT manager_id FROM employees WHERE first_name = "Yonah" AND last_name = "Zebul")
);


-- SELECT employees.id AS "Employee ID", employees.first_name, employees.last_name, roles.title AS "Title", dept_name AS "Department", salary,
--             CONCAT( manager.first_name, " ", manager.last_name) as Manager
--             FROM ((roles
--             JOIN employees ON employees.role_id = roles.id)
--             JOIN departments ON departments.id = roles.department_id)
--             LEFT JOIN employees manager ON employees.manager_id = manager.id
--             ORDER BY employees.id;

SELECT CONCAT(employees.first_name, " ", employees.last_name) AS Manager
FROM employees
WHERE employees.manager_id = employees.id;

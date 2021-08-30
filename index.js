const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const connectionVars = require('./connection.json')

const connection = mysql.createConnection({
  host: connectionVars.host,
  port: 3306,
  user: connectionVars.user,
  password: connectionVars.password,
  database: connectionVars.database,
});

function startPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "What would you like to do ? ",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "View All Employees",
          "Update Employee Manager",
        ],
      },
    ])
    .then((userChoice) => {
      switch (userChoice.memberChoice) {
        case "View All Employees":
          viewEmloyee();
          break;
        case "View All Employees By Department":
          departmentEmployee();
          break;
        case "View All Employees By Manager":
          Manager();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Update Employee Role":
          UpdateEmployee();
          break;
        case "View All Employees":
          viewEmployee();
          break;
        case "Update Employee Manager":
          UpdateEmployeeManager();
          break;
      }
    });
}
function addEmployee(){
    connection.query(
    `SELECT * FROM roles`,
    function (err, results) {
    if(err) throw err;
    var roles = [];
    results.forEach(job => {
      roles.push(job.title);
    });
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the employees first name?'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the employees last name?'
    },
    {
      type: 'list',
      name: 'newEmployeesRole',
      message: 'What is this employees role?',
      choices: roles
    }
  ])
  .then(answer => {
    const {first_name} = answer;
    const {last_name} = answer;
    const {newEmployeesRole} = answer;
    var role_id = -1;
    results.forEach(role => {
      if(role.title == newEmployeesRole){
        role_id = role.id;
      }
    });
      connection.query(
        `insert into employees (first_name, last_name, role_id)
        values ("${first_name}", "${last_name}", ${role_id});`,
        function (err, results) {
        if(err) throw err;
        startPrompt();
      });
  });
  });
}
function viewEmloyee() {
  connection.query(
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager 
    FROM employees e 
    INNER JOIN roles r ON e.role_id = r.id 
    INNER JOIN departments d ON r.department_id = d.id 
    LEFT JOIN employees m ON e.manager_id = m.id;`,
    function (err, results) {
    if(err) throw err;
    console.log(cTable.getTable(results));
  });
  startPrompt()
}
function UpdateEmployee(){
  connection.query(
    `SELECT * FROM roles`,
    function (err, results) {
    if(err) throw err;
    var roles = [];
    results.forEach(job => {
      roles.push(job.title);
    });
    connection.query(
      `SELECT * FROM employees`,
      function (error, data) {
      if(error) throw error;
      var employees = [];
      data.forEach(person => {
        employees.push(person.first_name + ' ' + person.last_name);
      });
      inquirer.prompt([
        {
          type: 'list',
          name: 'selectedEmployee',
          message: 'Which employee would you like to update?',
          choices: employees
        },
        {
          type: 'list',
          name: 'chosenField',
          message: 'Select a new role for this employee',
          choices: roles
        }
      ])
      .then(answer => {
        const {selectedEmployee} = answer;
        const {chosenField} = answer;
        var role_id = -1;
        results.forEach(role => {
          if(role.title == chosenField){
            role_id = role.id;
          }
        });
        var emp_id = -1;
        data.forEach(emp => {
          if((emp.first_name + ' ' + emp.last_name) == selectedEmployee){
            emp_id = emp.id;
          }
        });
        connection.query(
          `UPDATE employees 
          SET role_id = ${role_id}
          WHERE id = ${emp_id};`,
          function (er, response) {
          if(er) throw er;
          startPrompt();
        });
        });
    });
  });
}
startPrompt();

















  



drop database if exists employeeDB;
create database employeeDB;
use employeeDB;

create table departments(
id int auto_increment,
name varchar(30),
primary key(id)
);

create table roles(
id int auto_increment,
title varchar(30) not null,
salary decimal,
department_id int,
primary key(id),
foreign key(department_id) references departments(id)
);

create table employees(
id int auto_increment,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id int,
manager_id int,
primary key(id),
foreign key(role_id) references roles(id),
foreign key(manager_id) references employees(id)
);

INSERT INTO departments (id,name) values (1,'sales');
INSERT INTO departments (id,name)values (2,'finance');
INSERT INTO departments(id,name) values (3,'marketing');
INSERT INTO departments (id,name) values (4,'operations');
INSERT INTO departments (id,name) values (5,'human resource');

INSERT INTO roles (id,title,salary,department_id) values (1,'COO','10000',1);
INSERT INTO roles (id,title,salary,department_id) values (2,'CEO','15000',1);
INSERT INTO roles (id,title,salary,department_id) values (3,'chairman','20000',2);
INSERT INTO roles (id,title,salary,department_id) values (4,'vp','40000',3);
INSERT INTO roles (id,title,salary,department_id) values (5,'CFO','17000',4);

INSERT INTO employees (id,first_name,last_name,role_id,manager_id) values (1,'aldo','quintero',3,null);
INSERT INTO employees(id,first_name,last_name,role_id,manager_id)values (2,'jose','quintero',4,1);
INSERT INTO employees (id,first_name,last_name,role_id,manager_id)values (3,'pablo','gomez',1,null);
INSERT INTO employees (id,first_name,last_name,role_id,manager_id) values (4,'jack','taylor',2,3);
INSERT INTO employees (id,first_name,last_name,role_id,manager_id) values (5,'hector','carbajal',5,null);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;
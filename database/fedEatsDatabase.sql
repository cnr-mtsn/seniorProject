create Database FedEats;

use FedEats;

create table users
(
    user_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    pass VARBINARY(1024),
    salt VARCHAR(1024) NOT NULL,
    PRIMARY KEY(user_id)
);

create table sandwichBase
(
    sandwich_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    price DOUBLE,
    PRIMARY KEY(sandwich_id)
);

create table tortillaBase
(
    tortilla_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    price DOUBLE,
    PRIMARY KEY(tortilla_id)
);

create table main
(
    main_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(50),
    description VARCHAR(1000),
    price DOUBLE NOT NULL,
    PRIMARY KEY(main_id)
);

CREATE TABLE orders
(
    order_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    total DOUBLE NOT NULL,
    order_date DATE,
    PRIMARY KEY(order_id)
);

create table main_sandwich
(
    main_sandwich_id INT NOT NULL AUTO_INCREMENT,
    main_id INT NOT NULL,
    sandwich_id INT NOT NULL,
    PRIMARY KEY(main_sandwich_id)
);

create table main_tortilla
(
    main_tortilla_id INT NOT NULL AUTO_INCREMENT,
    main_id INT NOT NULL,
    tortilla_id INT NOT NULL,
    PRIMARY KEY(main_tortilla_id)
);

create table main_protein
(
    main_protein_id INT NOT NULL AUTO_INCREMENT,
    main_id INT NOT NULL,
    protein_id INT NOT NULL,
    PRIMARY KEY(main_protein_id)
);

create table main_cheese
(
    main_cheese_id INT NOT NULL AUTO_INCREMENT,
    main_id INT NOT NULL,
    cheese_id INT NOT NULL,
    PRIMARY KEY(main_cheese_id)
);

create table main_veggies
(
    main_veggies_id INT NOT NULL AUTO_INCREMENT,
    main_id INT NOT NULL,
    veggies_id INT NOT NULL,
    PRIMARY KEY(main_veggies_id)
);

create table main_condiments
(
    main_condiments_id INT NOT NULL AUTO_INCREMENT,
    main_id INT NOT NULL,
    condiments_id INT NOT NULL,
    PRIMARY KEY(main_condiments_id)
);

create table main_extras
(
    main_extras_id INT NOT NULL AUTO_INCREMENT,
    main_id INT NOT NULL,
    extras_id INT NOT NULL,
    PRIMARY KEY(main_extras_id)
);

create table protein
(
    protein_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    price DOUBLE,
    PRIMARY KEY(protein_id)
);

create table cheese
(
    cheese_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    price DOUBLE,
    PRIMARY KEY(cheese_id)
);

create table veggies
(
    veggie_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    price DOUBLE,
    PRIMARY KEY(veggie_id)
);

create table condiments
(
    condiments_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    price DOUBLE,
    PRIMARY KEY(condiments_id)
);

create table extras
(
    extras_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    price DOUBLE,
    PRIMARY KEY(extras_id)
);

create table pickupTimes
(
  	time_id INT NOT NULL AUTO_INCREMENT,
   	pickupTime VARCHAR(50) NOT NULL,
    available INT NOT NULL,
    PRIMARY KEY(time_id)
);

insert into sandwichBase(name, price)
values("Sourdough", 1.50);

insert into sandwichBase(name, price)
values("Wheat", 1.50);

insert into sandwichBase(name, price)
values("Ciabatta", 1.50);

insert into sandwichBase(name, price)
values("Honey Wheat", 1.50);

insert into tortillaBase(name, price)
values("White Flour", 1.50);

insert into tortillaBase(name, price)
values("Wheat", 1.50);

insert into tortillaBase(name, price)
values("Honey Wheat", 1.50);

insert into tortillaBase(name, price)
values("Tomato Basil", 1.50);

insert into tortillaBase(name, price)
values("Spinach", 1.50);

insert into protein(name, price)
values("Ham", 1.00);

insert into protein(name, price)
values("Roast Beef", 1.00);

insert into protein(name, price)
values("Turkey", 1.00);

insert into protein(name, price)
values("Salami", 1.00);

insert into protein(name, price)
values("Tuna Salad", 1.00);

insert into protein(name, price)
values("Grilled Chicken", 1.00);

insert into protein(name, price)
values("Breaded Chicken", 1.00);

insert into protein(name, price)
values("Pepperoni", 1.00);

insert into protein(name, price)
values("Chicken Salad", 1.00);

insert into cheese(name, price)
values("Cheddar", .25);

insert into cheese(name, price)
values("American", .25);

insert into cheese(name, price)
values("Swiss", .25);

insert into cheese(name, price)
values("Provolone", .25);

insert into cheese(name, price)
values("Pepper Jack", .25);

insert into cheese(name, price)
values("Parmesan", .25);

insert into veggies(name, price)
values ("Shredded Lettuce", .20);

insert into veggies(name, price)
values ("Leaf Lettuce", .20);

insert into veggies(name, price)
values ("Tomatoes", .20);

insert into veggies(name, price)
values ("Red Onions", .20);

insert into veggies(name, price)
values ("Jalapeños", .20);

insert into veggies(name, price)
values ("Mixed Peppers", .20);

insert into veggies(name, price)
values ("Banana Peppers", .20);

insert into veggies(name, price)
values ("Mushrooms", .20);

insert into veggies(name, price)
values ("Sprouts", .20);

insert into veggies(name, price)
values ("Cucumbers", .20);

insert into veggies(name, price)
values ("Pickles", .20);

insert into condiments(name, price)
values ("Mayonnaise", .15);

insert into condiments(name, price)
values ("Spicy Mayonnaise", .15);

insert into condiments(name, price)
values ("Ranch Dressing", .15);

insert into condiments(name, price)
values ("Buffalo Sauce", .15);

insert into condiments(name, price)
values ("Sriracha", .15);

insert into condiments(name, price)
values ("Mustard", .15);

insert into condiments(name, price)
values ("Honey Mustard", .15);

insert into condiments(name, price)
values ("Spicy Brown Mustard", .15);

insert into condiments(name, price)
values ("Hummus", .15);

insert into extras(name, price)
values ("Pickle", .50);

insert into extras(name, price)
values ("Carrots", .50);

insert into extras(name, price)
values ("Avocado", .50);

insert into pickupTimes(pickupTime, available)
values("11:00", 1);

insert into pickupTimes(pickupTime, available)
values("11:15", 1);

insert into pickupTimes(pickupTime, available)
values("11:30", 1);

insert into pickupTimes(pickupTime, available)
values("11:45", 1);

insert into pickupTimes(pickupTime, available)
values("12:00", 1);

insert into pickupTimes(pickupTime, available)
values("12:15", 1);

insert into pickupTimes(pickupTime, available)
values("12:30", 1);

insert into pickupTimes(pickupTime, available)
values("12:45", 1);

insert into pickupTimes(pickupTime, available)
values("1:00", 1);

insert into pickupTimes(pickupTime, available)
values("1:15", 1);

insert into pickupTimes(pickupTime, available)
values("1:30", 1);

insert into pickupTimes(pickupTime, available)
values("1:45", 1);

insert into pickupTimes(pickupTime, available)
values("2:00", 1);
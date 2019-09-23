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
    PRIMARY KEY(sandwich_id)
);

create table tortillaBase
(
    tortilla_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(tortilla_id)
);

create table main
(
    main_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(50),
    description VARCHAR,
    PRIMARY KEY(main_id)
);

create table protein
(
    protein_id INT NOT NULL AUTO_INCREMENT,
    main_id INT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(protein_id)
);

create table cheese
(
    cheese_id INT NOT NULL AUTO_INCREMENT,
    main_id INT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(cheese_id)
);

create table veggies
(
    veggie_id INT NOT NULL AUTO_INCREMENT,
    main_id INT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(veggie_id)
);

create table condiments
(
    condiments_id INT NOT NULL AUTO_INCREMENT,
    main_id INT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(condiments_id)
);

create table extras
(
    extras_id INT NOT NULL AUTO_INCREMENT,
    main_id INT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(extras_id)
);

create table pickupTimes
(
  	time_id INT NOT NULL AUTO_INCREMENT,
   	pickupTime VARCHAR(50) NOT NULL,
    avalible INT NOT NULL,
    PRIMARY KEY(time_id)
);

insert into sandwichBase(name)
values("Sourdough");

insert into sandwichBase(name)
values("Wheat");

insert into sandwichBase(name)
values("Ciabatta");

insert into sandwichBase(name)
values("Honey Wheat");

insert into tortillaBase(name)
values("White Flour");

insert into tortillaBase(name)
values("Wheat");

insert into tortillaBase(name)
values("Honey Wheat");

insert into tortillaBase(name)
values("Tomato Basil");

insert into tortillaBase(name)
values("Spinach");

insert into protein(name)
values("Ham");

insert into protein(name)
values("Roast Beef");

insert into protein(name)
values("Turkey");

insert into protein(name)
values("Salami");

insert into protein(name)
values("Tuna Salad");

insert into protein(name)
values("Grilled Chicken");

insert into protein(name)
values("Breaded Chicken");

insert into protein(name)
values("Pepperoni");

insert into protein(name)
values("Chicken Salad");

insert into cheese(name)
values("Cheddar");

insert into cheese(name)
values("American");

insert into cheese(name)
values("Swiss");

insert into cheese(name)
values("Provolone");

insert into cheese(name)
values("Pepper Jack");

insert into cheese(name)
values("Parmesan");

insert into veggies(name)
values ("Shredded Lettuce");

insert into veggies(name)
values ("Leaf Lettuce");

insert into veggies(name)
values ("Tomatoes");

insert into veggies(name)
values ("Red Onions");

insert into veggies(name)
values ("Jalapeños");

insert into veggies(name)
values ("Mixed Peppers");

insert into veggies(name)
values ("Banana Peppers");

insert into veggies(name)
values ("Mushrooms");

insert into veggies(name)
values ("Sprouts");

insert into veggies(name)
values ("Cucumbers");

insert into veggies(name)
values ("Pickles");

insert into condiments(name)
values ("Mayonnaise");

insert into condiments(name)
values ("Spicy Mayonnaise");

insert into condiments(name)
values ("Ranch Dressing");

insert into condiments(name)
values ("Buffalo Sauce");

insert into condiments(name)
values ("Sriracha");

insert into condiments(name)
values ("Mustard");

insert into condiments(name)
values ("Honey Mustard");

insert into condiments(name)
values ("Spicy Brown Mustard");

insert into condiments(name)
values ("Hummus");

insert into extras(name)
values ("Pickle");

insert into extras(name)
values ("Carrots");

insert into extras(name)
values ("Avocado");

insert into pickupTimes(pickupTime, avalible)
values("11:00", 1);

insert into pickupTimes(pickupTime, avalible)
values("11:15", 1);

insert into pickupTimes(pickupTime, avalible)
values("11:30", 1);

insert into pickupTimes(pickupTime, avalible)
values("11:45", 1);

insert into pickupTimes(pickupTime, avalible)
values("12:00", 1);

insert into pickupTimes(pickupTime, avalible)
values("12:15", 1);

insert into pickupTimes(pickupTime, avalible)
values("12:30", 1);

insert into pickupTimes(pickupTime, avalible)
values("12:45", 1);

insert into pickupTimes(pickupTime, avalible)
values("1:00", 1);

insert into pickupTimes(pickupTime, avalible)
values("1:15", 1);

insert into pickupTimes(pickupTime, avalible)
values("1:30", 1);

insert into pickupTimes(pickupTime, avalible)
values("1:45", 1);

insert into pickupTimes(pickupTime, avalible)
values("2:00", 1);
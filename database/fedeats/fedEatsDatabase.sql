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
   	pickupTime DateTime NOT NULL,
    avalible INT NOT NULL,
    PRIMARY KEY(time_id)
);
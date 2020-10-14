CREATE TABLE towns (
    town_name varchar (100),
    town_string varchar (100) primary key
);

CREATE TABLE reg_nums(
    reg_number text,
    start_string varchar,
    FOREIGN KEY (start_string) REFERENCES towns(town_string)

);


INSERT into towns (town_name, town_string) VALUES('Cape Town', 'CA');
INSERT into towns(town_name, town_string) VALUES('Paarl', 'CJ');
INSERT into towns (town_name, town_string) VALUES('Stellenbosch', 'CL');

    ALTER TABLE towns ADD id serial;


ALTER TABLE reg_nums ADD town_id,
FOREIGN KEY (town_id) REFERENCES towns(id);

    
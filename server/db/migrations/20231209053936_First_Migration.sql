-- migrate:up
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    unique_token VARCHAR(255) 
);

CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    unique_token VARCHAR(255) 
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    date DATE,
    location VARCHAR(255)
);

CREATE TABLE event_forms (
    id SERIAL PRIMARY KEY,
    RVSP_code VARCHAR(255),
    event_id INT,
    user_id INT
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    image VARCHAR(4096)
);

CREATE TABLE organizers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    image VARCHAR(4096)
);

CREATE TABLE partners (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    link VARCHAR(4096),
    image VARCHAR(4096)
);

CREATE TABLE pre_order_forms (
    id SERIAL PRIMARY KEY,
    user_id INT,
    shipping_province VARCHAR(255),
    shipping_city VARCHAR(255),
    shipping_street VARCHAR(255),
    shipping_house_number VARCHAR(255),
    merch_id INT,
    gcash_receipt VARCHAR,
    merch_quantity INT
);

CREATE TABLE merch (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    image VARCHAR(4096),
    price INT
);


-- migrate:down
DROP TABLE users;
DROP TABLE admins;
DROP TABLE events;
DROP TABLE event_forms;
DROP TABLE projects;
DROP TABLE organizers;
DROP TABLE partners;
DROP TABLE pre_order_forms;
DROP TABLE merch;
# Storefront Backend Project
This project is about backend API build with Nodejs for online store and using RESTful API that will Used in frontend.


## Installation 
-npm install -> to install packages
Packages
1- express ->
npm i express, npm i -D express

2- typescript->
npm i typescript ,npm i -D @typescript

3- dotenv->
npm i dotenv

4- db-migration ->
npm i db-migrate,npm i db-migrate-pg

5- jasmin ->
npm i jasmine, npm i -D @types/jasmine

6- jasmine-spec-reporter->
npm i jasmine-spec-reporter, npm i -D jasmine-spec-reporter

7-supertest->
npm i - D supertest, npm i -D @types/supertest

8-cors ->
npm i -save cors

9- morgan ->
npm i -save morgan , npm i -D @types/morgan 

10-bcrypt ->
npm i bcrypt,npm i -D bcrypt

11-jsonwebtoken
npm i jsonwebtoken, npm i- D @types/jsonwebtoken

## Scripts
 1- npm start -> start server
 2- npm run lint -> running eslint 
 3- npm run prettier -> running prettier
 4- npm run lint:f -> fixing eslint & orettier
 5- npm run migrate->running db-migrate up 
 6- npm run test -> testing by jasmin 

## creation of Database
- psql -U postgres -> connecting to postgres
- CREATE DATABASE my_store; -> creating "dev" database
- CREATE DATABASE my_test; -> creating "test" database
- \c my_store; -> connecting to dev database "my_store"
- \c my_test; -> connecting to test database "my_test"

## Datadase Migration 
npm run migrate 

CREATE TABLE my_users(
    id SERIAL PRIMARY  KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(70)NOT NULL
);

CREATE TABLE my_products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(70) NOT NULL,
    price integer NOT NULL
);

CREATE TABLE my_orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(30),
    myuser_id bigint REFERENCES my_users(id)
);

CREATE TABLE my_products_orders (
    id SERIAL PRIMARY KEY, 
    quantity integer,
    o_id bigint REFERENCES my_orders(id),
    p_id bigint REFERENCES my_products(id)
);

## Enviromental Variables

MY_PORT=5432
MY_HOST=127.0.0.1
MY_DATABASE=my_store
MY_DATABASE_TEST=my_test
MY_USER=postgres
MY_PASSWORD=postgres
ENV=dev
MY_BCRYPT_PASSWORD=secrEts-should-be-secrEts
MY_SALT_ROUNDS=10
MY_SECRET_TOKEN=my-secrEt-token-should-also-be-secrEt

## NOTES
1- .env and node_modules files added into .gitignore file
2- .env file is setting by default to "dev" and while running test script .env will reset to "test"



CREATE TABLE my_orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(30),
    myuser_id bigint REFERENCES my_users(id)
);
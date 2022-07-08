CREATE TABLE my_users(
    id SERIAL PRIMARY  KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(70)NOT NULL
)

CREATE TABLE my_products_orders (
    id SERIAL PRIMARY KEY, 
    quantity integer,
    o_id bigint REFERENCES my_orders(id),
    p_id bigint REFERENCES my_products(id)
);
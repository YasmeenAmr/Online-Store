import data_client from '../envConfig';

export type Products = {
  id?: number;
  product_name: string;
  price: number;
};

export class MY_Store_Pro {
  async create(u: Products): Promise<Products> {
    try {
      const connections = await data_client.connect();
      const sql =
        'INSERT INTO my_products (product_name , price) VALUES($1, $2) RETURNING *';
      const result = await connections.query(sql, [u.product_name, u.price]);
      const product = result.rows[0];
      console.log(product);
      connections.release();
      return product;
    } catch (error) {
      console.log(error);
      throw new Error(
        `sorry we can't create this product with ${u.product_name}. Error: ${error}`
      );
    }
  }

  async update(u: Products): Promise<Products> {
    try {
      const connections = await data_client.connect();
      const sql =
        'UPDATE my_products SET id=($1), product_name=($2), price=($3)  WHERE id=$1 RETURNING  *';
      const result = await connections.query(sql, [
        u.id,
        u.product_name,
        u.price,
      ]);
      const product = result.rows[0];
      connections.release();
      return product;
    } catch (error) {
      throw new Error(
        `sorry we can't update this product with ${u.product_name}. Error: ${error}`
      );
    }
  }

  async index(): Promise<Products[]> {
    try {
      const connections = await data_client.connect();
      const sql = 'SELECT * FROM my_products';
      const result = await connections.query(sql);
      connections.release();
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error(`sorry we can't get products. Error: ${error}`);
    }
  }

  async show(id: number): Promise<Products> {
    try {
      const connections = await data_client.connect();
      const sql = 'SELECT * FROM my_products WHERE id=($1)';
      const result = await connections.query(sql, [id]);
      const product = result.rows[0];
      connections.release();
      return product;
    } catch (error) {
      throw new Error(
        `sorry we can't get  this product with ${id}. Error: ${error}`
      );
    }
  }

  async delete(id: number): Promise<Products> {
    try {
      const connections = await data_client.connect();
      const sql = 'DELETE FROM my_products WHERE id=($1) RETURNING *';
      const result = await connections.query(sql, [id]);
      const product = result.rows[0];
      connections.release();
      return product;
    } catch (error) {
      throw new Error(
        `sorry we can't delete this product with ${id}. Error: ${error}`
      );
    }
  }
}

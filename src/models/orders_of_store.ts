import data_client from '../envConfig';

export type Orders = {
  id?: number;
  status: string;
  myuser_id: number;
};

export class MY_Store_Ord {
  async create(u: Orders): Promise<Orders> {
    try {
      const sql =
        'INSERT INTO my_orders ( status,myuser_id) VALUES($1, $2) RETURNING *';
      const connections = await data_client.connect();
      const result = await connections.query(sql, [u.status, u.myuser_id]);
      const order = result.rows[0];
      connections.release();
      return order;
    } catch (error) {
      throw new Error(
        `sorry we can't create this order for user with id: ${u.myuser_id}. Error: ${error}`
      );
    }
  }

  async update(u: Orders): Promise<Orders> {
    try {
      const connections = await data_client.connect();
      const sql =
        'UPDATE my_orders SET id=($1),status=($2),myuser_id=($3)  WHERE id=$1 RETURNING *';
      const result = await connections.query(sql, [
        u.id,
        u.status,
        u.myuser_id,
      ]);
      const order = result.rows[0];
      connections.release();
      return order;
    } catch (error) {
      throw new Error(
        `sorry we can't update this order with id: ${u.id}. Error: ${error}`
      );
    }
  }

  async index(): Promise<Orders[]> {
    try {
      const connections = await data_client.connect();
      const sql = 'SELECT * FROM my_orders';
      const result = await connections.query(sql);
      connections.release();
      return result.rows;
    } catch (error) {
      throw new Error(` sorry we can't get orders. Error: ${error}`);
    }
  }

  async show(id: number): Promise<Orders> {
    try {
      const connections = await data_client.connect();
      const sql = 'SELECT * FROM my_orders WHERE id=($1)';
      const result = await connections.query(sql, [id]);
      const order = result.rows[0];
      connections.release();
      return order;
    } catch (error) {
      throw new Error(
        `sorry we can't get  this order with ${id}. Error: ${error}`
      );
    }
  }

  async delete(id: number): Promise<Orders> {
    try {
      const connections = await data_client.connect();
      const sql = 'DELETE FROM my_orders WHERE id=($1) RETURNING *';
      const result = await connections.query(sql, [id]);
      const order = result.rows[0];
      connections.release();
      return order;
    } catch (error) {
      throw new Error(
        `sorry we can't delete this order with ${id}. Error: ${error}`
      );
    }
  }

  async add_Product_to_order(quantity: number, o_id: number, p_id: number) {
    try {
      const connections = await data_client.connect();
      const sql =
        'INSERT INTO my_products_orders (quantity, o_id,p_id) VALUES($1, $2, $3) RETURNING *';
      const result = await connections.query(sql, [quantity, o_id, p_id]);
      const order = result.rows[0];
      connections.release();
      return order;
    } catch (error) {
      throw new Error(
        `sorry we can't add this product with  id:${p_id} to order with id: ${o_id}: ${error}`
      );
    }
  }
}

import data_client from '../envConfig';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export type Users = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};

const { MY_SALT_ROUNDS, MY_BCRYPT_PASSWORD } = process.env;
const passwordhashing = (password: string) => {
  const salt = parseInt(MY_SALT_ROUNDS as string, 10);
  return bcrypt.hashSync(`${password}${MY_BCRYPT_PASSWORD}`, salt);
};
export class MY_Store {
  async create(u: Users): Promise<Users> {
    try {
      const connections = await data_client.connect();
      const sql =
        'INSERT INTO my_users (first_name,last_name, password) VALUES ($1, $2, $3) RETURNING *';
      //const hasspass= bcrypt.hashSync((u.password)+pepper,parseInt(salt));
      const result = await connections.query(sql, [
        u.first_name,
        u.last_name,
        passwordhashing(u.password),
      ]);
      const user = result.rows[0];
      connections.release();
      return user;
    } catch (error) {
      throw new Error(`sorry we can't create this user. Error: ${error}`);
    }
  }

  async update(u: Users): Promise<Users> {
    try {
      const connections = await data_client.connect();
      const sql =
        'UPDATE my_users SET id=($1),first_name=($2),last_name=($3), password=($4)  WHERE id=$1 RETURNING *';
      const result = await connections.query(sql, [
        u.id,
        u.first_name,
        u.last_name,
        u.password,
      ]);
      const user = result.rows[0];
      connections.release();
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(`sorry we can't update   this user. Error: ${error}`);
    }
  }

  async index(): Promise<Users[]> {
    try {
      const connections = await data_client.connect();
      const sql = 'SELECT * FROM my_users';
      const result = await connections.query(sql);
      connections.release();
      return result.rows;
    } catch (error) {
      throw new Error(` sorry we can't get users. Error: ${error}`);
    }
  }

  async show(id: number): Promise<Users> {
    try {
      const connections = await data_client.connect();
      const sql = 'SELECT * FROM my_users WHERE id=($1)';
      const result = await connections.query(sql, [id]);
      const user = result.rows[0];
      connections.release();
      return user;
    } catch (error) {
      throw new Error(`sorry we can't get user with ${id}. Error: ${error}`);
    }
  }

  async delete(id: number): Promise<Users> {
    try {
      const connections = await data_client.connect();
      const sql = 'DELETE FROM my_users WHERE id=($1) RETURNING *';
      const result = await connections.query(sql, [id]);
      const user = result.rows[0];
      connections.release();
      return user;
    } catch (error) {
      throw new Error(`sorry we can't delete user with ${id}. Error: ${error}`);
    }
  }
}

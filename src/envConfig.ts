import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  MY_PORT,
  MY_HOST,
  MY_DATABASE,
  MY_DATABASE_TEST,
  MY_USER,
  MY_PASSWORD,
  ENV,
} = process.env;

const data_client = new Pool({
  port: parseInt(MY_PORT as string, 10),
  host: MY_HOST,
  user: MY_USER,
  database: ENV === 'dev' ? MY_DATABASE : MY_DATABASE_TEST,
  password: MY_PASSWORD,
  max: 4,
});

export default data_client;

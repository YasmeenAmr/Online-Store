import express, { Request, Response } from 'express';
//import bodyParser from 'body-parser';
//import morgan from 'morgan';
//import config from './envConfig';
//import data_client from './envConfig';
import users_routes from './handlers/users_of_store_handler';
import products_routes from './handlers/product_of_store_handler';
import orders_routes from './handlers/orders_of_store_handler';

//console.log(config);
//console.log(data_client);
//const port=config.port;
const app = express();
const address = '0.0.0.0:3000';

app.use(express.json());
//app.use(bodyParser.json());
//app.use(morgan('common'));

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
});

users_routes(app);
products_routes(app);
orders_routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
export default app;

/*app.get('/', async function (req: Request, res: Response) {
  const connection = await data_client.connect();
  const query='SELECT NOW()';
  const results=await connection.query(query);
  connection.release();
  res.send(console.log (results.rows));
  });*/

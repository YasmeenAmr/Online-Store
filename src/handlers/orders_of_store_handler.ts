import express, { Request, Response } from 'express';
import { Orders, MY_Store_Ord } from '../models/orders_of_store';
import { validuser } from '../middleware/autohelper';
import { singin } from '../middleware/autohelper';



const storeord = new MY_Store_Ord();

const create = async (req: Request, res: Response) => {
  try {
   const {status,myuser_id}=req.body;
   validuser(req,myuser_id);
    const order: Orders = {
      status: req.body.status,
      myuser_id: req.body.myuser_id,
    };
    const neworder = await storeord.create(order);
    res.status(200).json(neworder);
  } catch (error) {
    res.status(400).json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const {status,myuser_id}=req.body;
    validuser(req,myuser_id);
    const ord: Orders = {
      id: Number(req.params.id),
      status: req.body.status,
      myuser_id: req.body.myuser_id,
    };
    const order = await storeord.update(ord);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    validuser(req);
    const order = await storeord.index();
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).send('Sorry can not find my order');
    }
    const order = await storeord.show(id);
    validuser(req,order.myuser_id);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

const delet = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).send('Sorry can not delete my order');
    }
    const delord = await storeord.delete(id);
    validuser(req,delord.myuser_id);
    res.status(200).json(delord);
  } catch (error) {
    res.status(400).json(error);
  }
};
const add_Product = async (req: Request, res: Response) => {
  try {
    const quantity: number = parseInt(req.body.quantity);
    const o_id = Number(req.params.id);
    const p_id = req.body.p_id;
    if (!p_id || !quantity) {
      return res
        .status(400)
        .send('Sorry we cant find parameter. p_id & quantity');
    }
    const order = await storeord.show(o_id);
    validuser(req, order.myuser_id);
    const product_Added_To_Order = await storeord.add_Product_to_order(
      quantity,
      o_id,
      p_id
    );
    res.status(200).json(product_Added_To_Order);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

const orders_routes = (app: express.Application) => {
  app.get('/order', index);
  app.get('/order/:id', show);
  app.post('/order', create);
  app.delete('/order/:id', delet);
  app.patch('/order/:id', update);
  app.post('/order/:id/product', add_Product);
};
export default orders_routes;

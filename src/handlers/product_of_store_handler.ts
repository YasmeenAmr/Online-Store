import express, { Request, Response } from 'express';
import { Products, MY_Store_Pro } from '../models/products_of_store';
import { validuser } from '../middleware/autohelper';
import { singin } from '../middleware/autohelper';


const storepro = new MY_Store_Pro();

const create = async (req: Request, res: Response) => {
  try {
    validuser(req)
    const product: Products = {
      product_name: req.body.product_name,
      price: req.body.price,
    };
    const newproduct = await storepro.create(product);
    console.log(newproduct);
    res.status(200).json(newproduct);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    validuser(req)
    const pro: Products = {
      id: Number(req.params.id),
      product_name: req.body.product_name,
      price: req.body.price,
    };
    const product = await storepro.update(pro);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

const index = async (req: Request, res: Response) => {
  try {
 
    const product = await storepro.index();
    res.status(200).send(product);
    console.log(product);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
  
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).send('Sorry can not find my product');
    }
    const product = await storepro.show(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

const delet = async (req: Request, res: Response) => {
  try {
    validuser(req)
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).send('Sorry can not delet my product');
    }
    const delpro = await storepro.delete(id);
    res.status(200).json(delpro);
  } catch (error) {
    res.status(400).json(error);
  }
};

const products_routes = (app: express.Application) => {
  app.get('/product', index);
  app.get('/product/:id', show);
  app.post('/product', create);
  app.delete('/product/:id', delet);
  app.patch('/product/:id', update);
};
export default products_routes;

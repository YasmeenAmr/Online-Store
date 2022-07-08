import express, { Request, Response } from 'express';
import { Users, MY_Store } from '../models/users_of_store';
import jwt from 'jsonwebtoken';
//import {validuser, signin} from '../middleware/autohelper';
import { validuser } from '../middleware/autohelper';
import { singin } from '../middleware/autohelper';

const store = new MY_Store();

const create = async (req: Request, res: Response) => {
  try {
    const user: Users = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };
    const newuser = await store.create(user);
    var user_token = singin(Number(newuser.id));
    res.status(200).json(user_token);
    console.log(user_token);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id} = req.body;
    validuser(req, id);
    const user: Users = {
      id: Number(req.params.id),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };
    const updateuser = await store.update(user);
    res.status(200).json(updateuser);
    console.log(updateuser);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    validuser(req)
    const user = await store.index();
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).send('Sorry can not find my user');
    }
    validuser(req, id);
    const user = await store.show(id);
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

const delet = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).send('Sorry can not delet my user');
    }
    validuser(req, id);
    const del = await store.delete(id);
    res.status(200).json(del);
  } catch (error) {
    res.status(400).json(error);
  }
};

const users_routes = (app: express.Application) => {
  app.get('/user', index);
  app.get('/user/:id', show);
  app.post('/user', create);
  app.delete('/user/:id', delet);
  app.patch('/user/:id', update);
};
export default users_routes;

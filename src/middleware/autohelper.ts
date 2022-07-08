import { verify, JwtPayload, sign } from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.MY_SECRET_TOKEN as string;

const validuser = (req: Request, id?: number) => {
  try {
    const autoheader = req.headers.authorization;
    // console.log (autoheader)
    const haedertoken = autoheader!.split(' ')[1];
    const decoding = verify(haedertoken as string, secret) as JwtPayload;
    if (id && decoding.user.id != id) {
      throw new Error('user undefined');
    }
  } catch (error) {
    //console.log(error)
  }
};
const singin = (id: number) => {
  return sign({ user: { id } }, secret);
};
export { validuser, singin };

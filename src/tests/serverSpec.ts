import supertest from 'supertest';
import app from '../server';
const req = supertest(app);

describe('testing server main endpoint', () => {
  it('respons with hello world', async () => {
    await req.get('/').expect('Hello World!');
  });
});

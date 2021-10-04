import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('Species routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should let you add a new Species', () => {
    return request(app)
      .post('/api/species')
      .send({ type: 'Mammal' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          type: 'Mammal',
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});

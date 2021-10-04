import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

// async function saveSomeSpecies() {
//   const mammal = { type: 'Mammal' };
//   const amphibian = { type: 'Amphibian' };
//   const reptile = { type: 'Reptile' };

//   Promise.all([mammal, amphibian, reptile]);
//   request(app).post('/api/species').send({ type: 'Mammal' });
//   request(app).post('/api/species').send({ type: 'Amphibian' });
//   request(app).post('/api/species').send({ type: 'Reptile' });
// }

describe('Species routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(() => {
    return request(app).post('/api/species').send({ type: 'Mammal' });
  });
  beforeEach(() => {
    return request(app).post('/api/species').send({ type: 'Amphibian' });
  });
  beforeEach(() => {
    return request(app).post('/api/species').send({ type: 'Reptile' });
  });

  it('should let you add a new Species', () => {
    return request(app)
      .post('/api/species')
      .send({ type: 'Bird' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '4',
          type: 'Bird',
        });
      });
  });

  it('should get all species', async () => {
    // await saveSomeSpecies();
    // request(app).post('/api/species').send({ type: 'Mammal' });
    // request(app).post('/api/species').send({ type: 'Amphibian' });
    // request(app).post('/api/species').send({ type: 'Reptile' });
    return request(app)
      .get('/api/species')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '1',
            type: 'Mammal',
          },
          {
            id: '2',
            type: 'Amphibian',
          },
          {
            id: '3',
            type: 'Reptile',
          },
        ]);
      });
  });

  afterAll(() => {
    pool.end();
  });
});

import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

async function saveSomeSpecies() {
  const speciesData = [
    { type: 'Mammal' },
    { type: 'Amphibian' },
    { type: 'Reptile' },
  ];

  return Promise.all(
    speciesData.map(async (species) => {
      const res = await request(app).post('/api/species').send(species);
      return res.body;
    })
  );
}

async function saveSomeAnimals() {
  const animalsData = [
    { name: 'bear', speciesId: '1' },
    { name: 'frog', speciesId: '2' },
    { name: 'fox', speciesId: '1' },
  ];
  return Promise.all(
    animalsData.map(async (animal) => {
      const res = await request(app).post('/api/animals').send(animal);
      return res.body;
    })
  );
}

describe('Species and Animals routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should let you add a new Species', () => {
    return request(app)
      .post('/api/species')
      .send({ type: 'Bird' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          type: 'Bird',
        });
      });
  });

  it('should get all species', async () => {
    await saveSomeSpecies();

    return request(app)
      .get('/api/species')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '1',
            type: expect.any(String),
          },
          {
            id: '2',
            type: expect.any(String),
          },
          {
            id: '3',
            type: expect.any(String),
          },
        ]);
      });
  });

  it('should add a new animal', async () => {
    await saveSomeSpecies();
    return request(app)
      .post('/api/animals')
      .send({ name: 'tiger', speciesId: '1' })
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'tiger',
          speciesId: '1',
        });
      });
  });

  it('should get an animal by id', async () => {
    await saveSomeSpecies();
    await saveSomeAnimals();

    return request(app)
      .get('/api/animals/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          name: expect.any(String),
          speciesId: expect.any(String),
        });
      });
  });

  it('should get all animals and include their species', async () => {
    await saveSomeSpecies();
    await saveSomeAnimals();

    return request(app)
      .get('/api/animals/species')
      .then((res) => {
        expect(res.body).toEqual([
          {
            name: expect.any(String),
            species: expect.any(String),
          },
          {
            name: expect.any(String),
            species: expect.any(String),
          },
          {
            name: expect.any(String),
            species: expect.any(String),
          },
        ]);
      });
  });

  it('updates an animal', async () => {
    await saveSomeSpecies();
    await saveSomeAnimals();

    return request(app)
      .put('/api/animals/1')
      .send({
        name: 'Tiger',
        speciesId: '1',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          name: 'Tiger',
          speciesId: '1',
        });
      });
  });

  it('deletes an animal by id', async () => {
    await saveSomeSpecies();
    await saveSomeAnimals();

    return request(app)
      .delete('/api/animals/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          name: expect.any(String),
          speciesId: expect.any(String),
        });
      });
  });

  it('should return a count of animals by species', async () => {
    await saveSomeSpecies();
    await saveSomeAnimals();

    return request(app)
      .get('/api/animals/species/count')
      .then((res) => {
        expect(res.body).toEqual([
          {
            count: expect.any(String),
            type: expect.any(String),
          },
          {
            count: expect.any(String),
            type: expect.any(String),
          },
        ]);
      });
  });

  afterAll(() => {
    pool.end();
  });
});

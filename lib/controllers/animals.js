import { Router } from 'express';
import Animals from '../models/Animals.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const { name, speciesId } = req.body;
      const savedAnimal = await Animals.insert({ name, speciesId });
      res.send(savedAnimal);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const animal = await Animals.get({ id });
      res.send(animal);
    } catch (error) {
      next(error);
    }
  });

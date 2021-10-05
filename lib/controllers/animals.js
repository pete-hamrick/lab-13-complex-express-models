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
  .get('/species', async (req, res, next) => {
    try {
      const animalsWithSpecies = await Animals.getWithSpecies();
      res.send(animalsWithSpecies);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const animal = await Animals.get(id);
      res.send(animal);
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const { name, speciesId } = req.body;
      const updatedAnimal = await Animals.put({ id, name, speciesId });
      res.send(updatedAnimal);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedAnimal = await Animals.delete(id);
      res.send(deletedAnimal);
    } catch (error) {
      next(error);
    }
  });

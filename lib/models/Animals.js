import pool from '../utils/pool.js';

export default class Animals {
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.speciesId = row.species_id;
  }

  static async insert({ name, speciesId }) {
    const { rows } = await pool.query(
      'INSERT INTO animals (name, species_id) VALUES ($1, $2) RETURNING *;',
      [name, speciesId]
    );
    return new Animals(rows[0]);
  }

  static async getWithSpecies() {
    const { rows } = await pool.query(
      `SELECT animals.name, species.type AS species FROM animals
      LEFT JOIN species
      ON animals.species_id = species.id;`
    );
    return rows;
  }

  static async get(id) {
    const { rows } = await pool.query('SELECT * FROM animals WHERE id=$1;', [
      id,
    ]);
    return new Animals(rows[0]);
  }

  static async put({ id, name, speciesId }) {
    const { rows } = await pool.query(
      'UPDATE animals SET name = $1, species_id =$2 WHERE id = $3 RETURNING *;',
      [name, speciesId, id]
    );
    return new Animals(rows[0]);
  }
}

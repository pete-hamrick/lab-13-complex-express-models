import pool from '../utils/pool.js';

export default class Species {
  constructor(row) {
    this.id = row.id;
    this.type = row.type;
  }

  static async insert({ type }) {
    const { rows } = await pool.query(
      'INSERT INTO species (type) VALUES ($1) RETURNING *;',
      [type]
    );
    return new Species(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM species;');
    return rows.map((row) => {
      return new Species(row);
    });
  }
}

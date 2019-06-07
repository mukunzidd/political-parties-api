import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const env = process.env.NODE_ENV || "development";

const db = {
  development: process.env.DEV_DB,
  test: process.env.TEST_DB
};

const query = (queryString, params) => {
  const pool = new Pool({
    connectionString: db[env]
  });
  return pool
    .query(queryString, params)
    .then(response => {
      const { rows } = response;
      pool.end();
      return rows;
    })
    .catch(error => {
      pool.end();
      throw error;
    });
};

export default { query };

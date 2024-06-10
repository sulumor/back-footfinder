import pg from "pg";

// const client = new pg.Pool({
//   host: process.env.PGHOST,
//   user: process.env.PGUSER,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
// });

const client = new pg.Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default client;

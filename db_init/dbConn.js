const config = require("config");
const pg = require("pg-promise")();

const pgPort = config.get("pgPort");
const pgURL = config.get("pgURL");
const pgDb = config.get("pgDb");
const pgUser = config.get("pgUser");
const pgPassword = config.get("pgPassword");

const pdb = pg({
  host: pgURL,
  port: pgPort,
  database: pgDb,
  user: pgUser,
  password: pgPassword,
  // ssl: true,
});

module.exports = { pdb: pdb };

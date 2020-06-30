const sqlite3 = require('sqlite3').verbose();
// Load SQLite database filename
const { database } = require('../config.json');

// static "class"
function DB() { }

// TODO add automatic table creation for the first time
function initialize() {
  let sql = 'CREATE TABLE users(id text)';
  DB.execute(sql, [], (err) => {
    if (err) throw err;
    console.log("Table users succesfully created.")
  });
}

// Executes a given statement
DB.execute = function (statement, params, callback) {
  let db = connect();
  // TODO errors validation
  db.run(statement, params, callback)
  db.close();
}

// Queries information in the database
DB.query = function (query, params, callback) {
  let db = connect();
  // TODO errors validation
  db.all(query, params, callback);
  db.close();
}

// Returns a database object
function connect() {
  let db = new sqlite3.Database(database, (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    } else {
      console.log('Connected to the database.');
    }
  });
  return db;
}

// Given a database object, closes the connection
function close(db) {
  db.close((err) => {
    if (err) {
      console.error(err.message);
      throw err;
    }
    console.log('Close the database connection.');
  });
}

module.exports = { DB };
// Import path module
const path = require('path');
// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, './db/product-catalog.db');
const PRODUCT_TABLE = require('./constants').PRODUCT_TABLE;

// Create connection to SQLite database
/*const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})*/

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'testuser',
    password : 'testuser123',
    database : 'product_catalog',
  },
  useNullAsDefault: true
});

knex.schema
  // Make sure no "products" table exists before creating new
  .hasTable(PRODUCT_TABLE)
  .then((exists) => {
    if (!exists) {
      console.error(`There is no table with name: ${PRODUCT_TABLE}`);
    }
  })
  .then(() => {
    console.log('Express server is running!')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`)
  })

// Just for debugging purposes:
// Log all data in "products" table
/*knex.select('*').from(PRODUCT_TABLE)
.then(data => console.log('data:', data))
.catch(err => console.log(err))*/

// Export the database
module.exports = knex
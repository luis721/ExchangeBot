const { DB } = require('./db');

function Data() { }

// Adds an user to the database
Data.add_user = function (user) {
  let sql = 'INSERT INTO users(id) VALUES(?)';
  DB.execute(sql, [user], (err) => {
    if (err) {
      console.log(err);
      console.log("Error registering the user.")
    } else {
      console.log("User added succesfully.")
    }
  });
}

// Retrieves the currently registered users
Data.get_users = function () {
  let sql = 'SELECT id FROM [users]';
  DB.query(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    // Show all the items
    rows.forEach((row) => {
      console.log(row.id);
    });
  });
}

//Data.add_user("john");
//Data.add_user("doe");
Data.get_users();
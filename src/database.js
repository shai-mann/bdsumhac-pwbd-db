var sqlite3 = require("sqlite3").verbose();
var md5 = require("md5");
var fs = require("fs");

const dataSql = fs.readFileSync("./data.sql").toString();
const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(dataSql, (err) => {});
  }
});

module.exports = db;

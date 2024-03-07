const pool = require("./databasePg");

const getData = (req, res) => {
  pool.query(`select * from customerdetails`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
};

module.exports = getData;

const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5584,
  user: "postgres",
  password: "7569782304",
  database: "customers_data",
});

module.exports = pool;


pool.connect()

pool.query(`select * from customerdetails`,(err,res)=>{
    if(!err){
         console.log(res.rows)
    }
});


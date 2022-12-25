import { Pool } from "pg";

let conn;

if (!conn) {
  conn = new Pool({
    user: "postgres" ,
    password: "tapanshutanay",
    host: "localhost",
    port: 5432,
    database: "tanaytapanshu",
  });
}

console.log("Yes connection is established",conn)

export default conn ;



// conn = new Pool({
//     user: process.env.PGSQL_USER,
//     password: process.env.PGSQL_PASSWORD,
//     host: process.env.PGSQL_HOST,
//     port: process.env.PGSQL_PORT,
//     database: process.env.PGSQL_DATABASE,
//   });
const mysql = require("mysql");

const conexion = mysql.createConnection({
  host: "localhost",
  user: "isael",
  password: "Efisio95",
  database: "crud_nodejs",
});

conexion.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("Conectado a la bd");
});

module.exports = conexion;

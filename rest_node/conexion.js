var mysql = require("mysql");

var conexion = mysql.createConnection({
  host: "localhost",
  user: "isael",
  password: "Efisio95",
  database: "articulosdb",
});

conexion.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("Conexión exitosa");
  }
});

module.exports = conexion;

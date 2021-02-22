var conexion = require("./conexion");

class Articulo {

   constructor() {   
   }
    
  obtenerArticulo(req, res) {
    conexion.query("SELECT * FROM articulos", (err, filas) => {
      if (err) {
        throw err;
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(filas);
        res.end();
      }
    });
  }
}

module.exports = Articulo;

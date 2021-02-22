//? Dependencias
var router = require("express").Router();
//var conexion = require("../conexion");
var Articulo = require("../Articulo");

//TODO: Mostrar todos
router.get("/", (req, res) => {
  conexion.query("SELECT * FROM articulos", (err, filas) => {
    if (err) {
      throw err;
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(filas);
      res.end();
    }
  });
  //var articulo = new Articulo();
  //articulo.obtenerArticulo(req, res);
});

//TODO: Mostrar solo uno
router.get("/:id", (req, res) => {
  conexion.query(
    "SELECT * FROM articulos WHERE id  = ?",
    [req.params.id],
    (err, fila) => {
      if (err) {
        throw err;
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(fila);
        //res.status(200).send(fila[0].descripcion);
        res.end();
      }
    }
  );
});

//TODO: Crear articulo
router.post("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  let data = {
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock,
  };

  let sql = "INSERT INTO articulos SET ?";

  conexion.query(sql, data, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(results);
    }
  });
});

//TODO: Modificar articulo
router.put("/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  let data = {
    id: req.params.id,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock,
  };

  let sql =
    "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?";

  conexion.query(
    sql,
    [data.descripcion, data.precio, data.stock, data.id],
    (err, results) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send(results);
      }
    }
  );
});

//TODO: Eliminar articulo
router.delete("/:id", (req, res) => {
  conexion.query(
    "DELETE FROM articulos WHERE id  = ?",
    [req.params.id],
    (err, fila) => {
      if (err) {
        throw err;
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(fila);
        res.end();
      }
    }
  );
});

module.exports = router;

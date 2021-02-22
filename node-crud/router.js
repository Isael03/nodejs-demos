const express = require("express");
const router = express.Router();
const conexion = require("./database/db");

router.get("/", (req, res) => {
  conexion.query("SELECT * from users", (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      //res.status(200).json(results)
      res.status(200).render("index", { results: results });
    }
  });
});

router.get("/create", (req, res) => {
  res.status(200).render("create");
});

router.get("/edit/:id", (req, res) => {
  const id =req.params.id;
  conexion.query("SELECT * FROM users WHERE id=?",[id], (err, results) => {
    if(err){
      throw err
    }else{
      res.render("edit", {user:results[0]})
    }
  })
})

const crud = require("./controllers/crud");

router.post("/save",(req, res) => {
  crud.save(req, res);
})

router.post("/update", (req, res) => {
  crud.update(req, res);
})

router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  conexion.query("DELETE FROM users WHERE id=?", [id], (err, results) => {
    if (err) {
      throw err
    } else {
      res.redirect("/")
    }
  })
})

router.get("/data", (req, res) => {
  conexion.query("SELECT * from users", (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      const data = JSON.stringify(results)
      res.status(200).send(data);
    }
  });
})

module.exports = { router };

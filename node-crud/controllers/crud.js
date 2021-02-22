const conexion = require("../database/db")

exports.save = (req, res) => {
    const user = req.body.user;
    const rol = req.body.rol;
    console.log(user + " " + rol);

    conexion.query("INSERT INTO users SET ?", {user:user, rol:rol}, (err, results) => {
      if (err) {
          throw err
      } else {
          res.redirect("/")
      }
    })
  
} 

exports.update= (req, res) => {
  const id= req.body.id
  const user= req.body.user;
  const rol = req.body.rol;

  conexion.query("UPDATE users SET ? WHERE id=?", [{user:user, rol:rol}, id], (err, result) => {
    if (err) {
        throw err
    } else {
        res.redirect("/")
    }
  })
}
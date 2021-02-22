const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/login", async (req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  if (user === "admin" && password === "12345") {
    let passwordHash = await bcrypt.hash(password, 8);
    //let passwordHash =  bcrypt.hashSync(password, 8);

    res.json({
      message: "Auntenticación exitosa",
      passwordHash: passwordHash,
    });
  } else {
    res.json({
      message: "Ingrese correctamente sus credenciales",
    });
  }
});

app.get("/compare",(req, res) => {
  let hashSaved= "$2a$08$ezGd4zIoXg9G1nMB6lvGmeEjGEIbur7P.pGQP30T75YbkyOdijPdS"
  let compare = bcrypt.compareSync("12345", hashSaved)

  if(compare){
      res.json("Ok")
  }else{
      res.json("no son iguales")
  }
})

app.listen(3000, () => {
  console.log("Servidor en linea");
});

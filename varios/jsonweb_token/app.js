var express = require("express");
const jwt = require("jsonwebtoken");

const keys = require("./settings/keys");

var app = express();

app.set("key", keys.key);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.end("<h1>Hola Mundo</h1>");
});

app.post("/login", (req, res) => {
  if (req.body.usuario === "admin" && req.body.password === "12345") {
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, app.get("key"), { expiresIn: "7d" });

    res.json({
      message: "¡AUTENTICACIÓN EXISTOSA",
      token: token,
    }); 
  } else {
    res.send("Usuario y/o contraseña incorrecta");
  }
});

const verificacion = express.Router();
verificacion.use((req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  //console.log(token);
  if(!token){
    res.status(401).send({
      error:'Es necesario un token de autenticación'
    })
  }
  if (token.startsWith('Bearer ')){
      token = token.slice(7, token.length)
      console.log(token);
  }
  if(token){
    jwt.verify(token, app.get('key'), (error, decoded)=>{
      if(error){
        return res.json({
          message: 'El token no es válido'
        })
      }else{
        req.decoded= decoded;
        next()
      }
    })
  }
});

app.get("/info", verificacion, (req, res) => {
  res.send("Informacion importante entregada");
});

app.listen(3000, () => {
  console.log("Servidor funcionando");
});

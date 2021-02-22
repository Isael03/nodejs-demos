//? Dependencias
var express = require("express");
var rutasArticulos = require('./routes/articulos')
var cors = require('cors')

var app = express();

//? Middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

//? Rutas
app.use('/api/articulos',rutasArticulos)

app.get("/", (req, res) => {
  res.send("Ruta inicio");
});

//? Puerto
const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log("App lanzada en puerto:" + port);
});

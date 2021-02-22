const { urlencoded } = require("express");
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/static', express.static(__dirname + '/public'));
app.use("/", require("./router").router);

/*app.get("/", (req, res) => {
  res.send("Hola mundo");
});*/

app.listen(3000, () => {
  console.log("Servidor encendido");
});

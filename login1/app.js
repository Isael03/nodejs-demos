const express = require("express");
const app = express();
const bcryptjs = require("bcryptjs");
const dontenv = require("dotenv");
const session = require("express-session");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

dontenv.config({ path: "./env/.env" });

//app.use("/resources", express.static("/public"));
app.use("/resources", express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

const connection = require("./database/db");


app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const user = req.body.user;
  const name = req.body.name;
  const rol = req.body.rol;
  const pass = req.body.pass;

  let passwordHash = await bcryptjs.hash(pass, 8);

  connection.query(
    "INSERT INTO users_node SET ?",
    { user, name, rol, password: passwordHash },
    async (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.render("register", {
          alert: true,
          alertTittle: "Registration",
          alertMessage: "Successful Registration!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "",
        });
      }
    }
  );
});

app.post("/auth", async (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;
 
  let passwordHash = await bcryptjs.hash(pass, 8).catch(() => {
    console.log('Error');
  });

  

  if (user && pass) {
    connection.query(
      "SELECT * FROM users_node WHERE user = ?",
      [user],
      async (error, results) => {

        if (
          results.length == 0 ||
          !(await bcryptjs.compare(pass, results[0].password))
        ) {
          res.render('login', {
            alert: true,
            alertTittle: "Error",
            alertMessage: "Usuario y/o password incorrectas",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "login",
          });
        } else {
          req.session.loggedIn = true
          req.session.name = results[0].name;
          res.render('login', {
            alert: true,
            alertTittle: "Conexión exitosa",
            alertMessage: "LOGIN CORRECTO",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1500,
            ruta: "",
          });
        }
      }
    );
  }else{
    res.render('login', {
      alert: true,
      alertTittle: "Advertencia",
      alertMessage: "Por favor ingrese un usuario y/o password",
      alertIcon: "warning",
      showConfirmButton: true,
      timer: false,
      ruta: "login",
    });  
  }
});

app.get('/', (req, res) => {
  if(req.session.loggedIn){
    res.render('index', {
      login: true,
      name: req.session.name 
    })
  }else{
    res.render('index', {
      login: false,
      name: 'Debe iniciar sesión'
    })
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

const port = 3000;
app.listen(port, () => {
  console.log("Server running on localhost:" + port);
});

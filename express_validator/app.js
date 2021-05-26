const express = require("express");
const app = express();
const { body, validationResult } = require("express-validator");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/registrar', [
  body('nya', 'Ingrese un nombre y apellido')
  .exists()
  .isLength({ min: 5 }),
  body('email', 'Ingrese un email valido')
  .exists()
  .isEmail(),
  body('edad', 'Ingrese un valor númerico')
  .exists()
  .isNumeric()
],
  (req, res) => {
    const errors = validationResult(req);
    /*if(!errors.isEmpty()){
      console.log(errors);
      return res.status(400).json({errors: errors.array()})   
    }*/

    if(!errors.isEmpty()){
      console.log(req.body);
      const valores = req.body;
      const validaciones = errors.array();

      res.render('index', {validaciones:validaciones, valores:valores});
    }

  })

app.listen(3000, () => {
  console.log('Server run');
})
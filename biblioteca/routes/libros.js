var express = require('express');
var router = express.Router();
const librosController = require('../controllers/librosControllers')
var multer = require('multer');

const fecha = Date.now();
const rutaAlmacen = multer.diskStorage({
  destination:(request, file, callback) => {
    callback(null, './public/images')
  },
  filename:(request, file, callback) => {
    console.log(file);
    callback(null, fecha+"_"+file.originalname)
  }
})

const cargar = multer({storage:rutaAlmacen})

/* Routes */
router.get('/', librosController.index);
router.get('/crear', librosController.crear);
router.post('/', cargar.single('archivo'), librosController.guardar)
router.post('/eliminar/:id', librosController.eliminar);
router.get('/editar/:id', librosController.editar);
router.post('/actualizar', cargar.single('archivo'), librosController.actualizar)


module.exports = router;

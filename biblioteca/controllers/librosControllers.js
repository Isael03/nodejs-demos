const conexion = require('../config/conexion')
const libro = require("../models/libro")
const path = require('path')
const borrar = require('fs')

module.exports = {

    index : function(req, res){
        libro.obtener(conexion, (err, datos) => {
          //console.log(datos);
          res.render('libros/index', {title: "Aplicación", libros:datos} );
        })
       },

       crear: (req, res) => {
        res.render('libros/crear')
       },

       guardar: (req, res) => {
         //console.log(req.filename);
        libro.insertar(conexion, req.body, req.file, (err, datos) => {
           res.redirect('/libros');
        })
       },

       eliminar: (req, res) => {
    
         libro.retornarDatosID(conexion, req.params.id, (err, registros) => {
           const nombreImagen = path.join(process.cwd(), '/public/images', registros[0].imagen)
           

           if(borrar.existsSync(nombreImagen)){
             borrar.unlinkSync(nombreImagen)
           }

           libro.borrar(conexion, req.params.id, () => {
             res.redirect('/libros');
           } )
         })
       },
       editar: (req, res) => {
        libro.retornarDatosID(conexion, req.params.id, (err, registros) => {
          res.render('libros/editar', {libro:registros[0]});
        })
         
       },
       actualizar: (req, res) => {
         
         
         if(req.file){
           if(req.file.filename){
            libro.retornarDatosID(conexion, req.body.id, (err, registros) => {
              const nombreImagen = path.join(process.cwd(), '/public/images', registros[0].imagen)
              
              if(borrar.existsSync(nombreImagen)){
                borrar.unlinkSync(nombreImagen)
              }
   
            libro.actualizarArchivo({conexion:conexion, datos: req.body, archivo:req.file}, (err) => {})
            })
           }
         }

         if(req.body.nombre){
          libro.actualizar({conexion:conexion, datos: req.body }, (err) => {
           
          })
         }
         res.redirect('/libros')
         //console.log(req.file.filename);
       }

}
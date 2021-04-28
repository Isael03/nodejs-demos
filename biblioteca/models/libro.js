module.exports={
    obtener: (conexion, funcion) => {
      conexion.query("SELECT * FROM libros", funcion)
    },
    insertar: (conexion, datos, archivos, funcion) => {
      conexion.query("INSERT INTO libros (nombre, imagen) VALUES (?, ?)",[datos.nombre, archivos.filename] , funcion)
    },
    retornarDatosID: (conexion,id,funcion) => {
      conexion.query("SELECT * FROM libros WHERE id = ?", [id], funcion)
    },
    borrar: (conexion,id,funcion) => {
      conexion.query('DELETE FROM libros WHERE id=?', [id], funcion)
    },
    actualizar:({conexion, datos}, funcion) => {
      conexion.query("UPDATE libros SET nombre=? WHERE id=?",[datos.nombre, datos.id] , funcion)
    },
    actualizarArchivo:({conexion, datos, archivo}, funcion) => {
      conexion.query("UPDATE libros SET imagen=? WHERE id=?",[archivo.filename, datos.id] , funcion)
    }


    
} 
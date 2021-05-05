const mongoose = require("mongoose");

const url = "mongodb://localhost/mongo1_curso";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Conectado a mongo"))
  .catch((err) => console.log("El error de conexion es " + err));

const personasSchema = mongoose.Schema(
  {
    nombre: { type: String },
    edad: { type: Number },
    pais: { type: String },
  },
  { versionKey: false }
);

const PersonaModel = mongoose.model("personas", personasSchema);

//Mostrar

const mostrar = async () => {
  const personas = await PersonaModel.find();
  console.log(personas);
};

/*PersonaModel.find({}, (err, docs) => {
   console.log(docs);
 })*/

const crear = async () => {
  const persona = new PersonaModel({
    nombre: "Alberto",
    edad: 25,
    pais: "España",
  });
  const resultado = await persona.save();
  console.log(resultado);
};

const actualizar = async (id) => {
  const persona = await PersonaModel.updateOne(
    { _id:id },
    {
      $set: {
        nombre: "Alberto modificado",
        pais: "España modificado",
      },
    }
  );
};

const eliminar = async (id) => {
  const persona = await PersonaModel.deleteOne({_id:id})
  console.log(persona);
}

//mostrar()
//crear();
//actualizar("609229aaa8ed6b418e5b8a19");
eliminar('609229992bf7e5416293aacc')


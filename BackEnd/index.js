const express = require("express");

// crear servidor
const app = express();

require("./base-orm/sqlite-init");  // crear base si no existe

app.use(express.json()); // para poder leer json en el body

const cors = require("cors");
app.use(
  cors({
    origin: "*", // origin: 'https://dds-frontend.azurewebsites.net'
  })
);

// controlar ruta
app.get("/", (req, res) => {
  res.send("dds-backend iniciado!");
});


const marcaRouter = require("./routes/marca");
app.use(marcaRouter);

const modeloRouter = require("./routes/modelos");
app.use(modeloRouter);

const autoRouter = require("./routes/autos");
app.use(autoRouter);

const localidadRouter = require("./routes/localidad");
app.use(localidadRouter);

const concesionariaRouter = require("./routes/concesionarias");
app.use(concesionariaRouter);

const autoxconcesionariaRouter = require("./routes/autoxconcesionaria");
app.use(autoxconcesionariaRouter);

// levantar servidor
if (!module.parent) {   // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
    const port = process.env.PORT || 4000;   // en producción se usa el puerto de la variable de entorno PORT
    app.locals.fechaInicio = new Date();
    app.listen(port, () => {
      console.log(`sitio escuchando en el puerto ${port}`);
    });
  }
  module.exports = app; // para testing
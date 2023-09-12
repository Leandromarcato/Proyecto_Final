const mongoose = require('mongoose');

// URL de conexión a MongoDB
const URI = process.env.MONGODB_LOCAL;

// Conexión a la base de datos
const conexion = mongoose.connect(URI)
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((error) => {
    console.error('Error en la conexión a MongoDB:', error);
  });

module.exports= conexion
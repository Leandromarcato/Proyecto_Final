const express = require('express');
const app = express();
const port = 3000
const morgan = require('morgan');
const cors = require('cors');
const procesarArchivo = require('./procesarArchivo'); 
require('dotenv').config()

require('./db/mongodb')

//midelwares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//ruta para procesar el archivo 
app.get('/procesar-archivo', (req, res) => {
    procesarArchivo((err, resultado) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al procesar el archivo');
      }
  
      return res.json(resultado);
    });
    
  });
  


app.listen(port,()=>{console.log('servidor corriendo en el puerto 3000')})


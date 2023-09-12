const fs = require('fs');
const path = require('path');

const procesarArchivo = (callback) => {
  const archivoEntrada = path.join(__dirname, 'data.txt'); // Obtener la ruta absoluta

  fs.readFile(archivoEntrada, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    const lineas = data.split('\n');
    const resultado = [];

    for (let i = 3; i < lineas.length; i++) {
      const campos = lineas[i].split(/\s+/);
      if (campos.length === 5) {
        const muestra = {
          No: parseInt(campos[0]),
          Date: campos[1],
          Time: parseFloat(campos[2]),
          Pressure: parseFloat(campos[3]),
          Temperature: parseFloat(campos[4])
        };
        resultado.push(muestra);
      }
    }

    return callback(null, resultado);
  });
};

module.exports = procesarArchivo;

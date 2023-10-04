const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const uploadedFile = req.file;
    const fileContent = fs.readFileSync(uploadedFile.path, 'utf-8');
    const jsonData = processTxtToJson(fileContent);
    console.log(jsonData)
 
    // Puedes har lo que necesites con el JSON aquí

    fs.unlinkSync(uploadedFile.path); // Elimina el archivo temporal

    res.status(200).json({ message: 'Archivo cargado y procesado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar el archivo' });
  }
});

function processTxtToJson(txtContent) {
  const rows = txtContent.trim().split('\n');

  // Encuentra números en cada fila
  const relevantData = rows.map(row => {
    const values = row.trim().split(/\s+/);
    return values.map(value => parseFloat(value)).filter(value => !isNaN(value));
  });

  const jsonData = relevantData.map(entry => {
    return {
      Temperature: entry[2],
      Pressure: entry[1],
      Depth: entry[3],
      Time: entry[0],
      Date: 'TuFecha' // Agrega aquí tu fuente para la fecha
    };
  });

  console.log('JSON generado:', jsonData);
  return jsonData;
}






app.listen(port, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});

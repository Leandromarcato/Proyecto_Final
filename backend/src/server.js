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
    console.log(jsonData);

    fs.unlinkSync(uploadedFile.path);

    res.status(200).json({ message: 'Archivo cargado y procesado correctamente', data: jsonData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar el archivo' });
  }
});

function processTxtToJson(txtContent) {
  const rows = txtContent.trim().split('\n');

  const relevantData = rows.map(row => {
    const values = row.trim().split(/\s+/);
    return values.map(value => parseFloat(value)).filter(value => !isNaN(value));
  });

  const jsonData = relevantData.map(entry => {
    return {
      Time: entry[0],
      Pressure: entry[1],
      Temperature: entry[2],
      Depth: entry[3],
      Dp_Dz: entry[4],
      Dt_Dz: entry[5],
      Description: entry[6]
    };
  });

  return jsonData;
}

app.listen(port, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});

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
  const headers = rows[1].split(/\s+/);

  const jsonData = rows.slice(2).map(row => {
    const values = row.trim().split(/\s+/);
    return headers.reduce((acc, header, index) => {
      acc[header] = values[index];
      return acc;
    }, {});
  });
  console.log('JSON generado:', jsonData);
  return jsonData;
}

app.listen(port, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});

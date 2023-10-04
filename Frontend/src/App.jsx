import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('Selecciona un archivo antes de cargarlo.');
      alert('Selecciona un archivo antes de cargar')
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Archivo cargado y procesado correctamente');
        alert('Archivo cargado y procesado correctamente')
      } else {
        console.error('Error al cargar el archivo');
      }
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
    }
  };

  return (
    <div className="App">
      <h1>Subir Archivo .txt y Enviar al Servidor</h1>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <button onClick={handleUpload}>Cargar Archivo</button>
    </div>
  );
}

export default App;






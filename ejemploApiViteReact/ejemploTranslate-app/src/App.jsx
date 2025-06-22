import { useState } from 'react';
import axios from 'axios';

function App() {
  const [texto, setTexto] = useState('');
  const [resultado, setResultado] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const traducirTexto = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await axios.post(
        'https://api-free.deepl.com/v2/translate',
        new URLSearchParams({
          auth_key: import.meta.env.VITE_DEEPL_API_KEY,
          text: texto,
          target_lang: 'EN',  // Cambia al idioma destino que quieras
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      setResultado(res.data.translations[0].text);
    } catch (err) {
      setError('Error al traducir');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>Traductor con DeepL API</h1>
      <textarea
        rows={4}
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder="Escribí algo en español..."
        style={{ width: '100%', fontSize: 16 }}
      />
      <button onClick={traducirTexto} disabled={cargando || !texto.trim()} style={{ marginTop: 10 }}>
        {cargando ? 'Traduciendo...' : 'Traducir al inglés'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {resultado && (
        <div style={{ marginTop: 20 }}>
          <h3>Traducción:</h3>
          <p>{resultado}</p>
        </div>
      )}
    </div>
  );
}

export default App;

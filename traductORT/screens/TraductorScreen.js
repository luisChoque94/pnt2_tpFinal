import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { traducir } from '../services/traductor';

export default function TranslatorScreen() {
  const [textoOriginal, setTextoOriginal] = useState('');
  const [traduccion, setTraduccion] = useState('');

  const manejarTraduccion = async () => {
    const resultado = await traducir(textoOriginal, 'en', 'es');
    if (resultado) setTraduccion(resultado);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Traductor Inglés → Español</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribí texto en inglés"
        value={textoOriginal}
        onChangeText={setTextoOriginal}
      />

      <Button title="Traducir" onPress={manejarTraduccion} />

      {traduccion ? (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoLabel}>Traducción:</Text>
          <Text style={styles.resultado}>{traduccion}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
  resultadoContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  resultadoLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resultado: {
    fontSize: 18,
  },
});

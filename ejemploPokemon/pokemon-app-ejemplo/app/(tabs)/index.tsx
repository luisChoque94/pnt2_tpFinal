//import React, { useEffect, useState } from 'react';
import { useEffect, useState} from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export default function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);        //pokemons =valor , setPokemons = forma de actualizar el estado
  const [loading, setLoading] = useState(true);

  useEffect(() => {             //ejecuto el codigo cada vez que cambie las dependencias 
    const fetchPokemons = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');  
        const data = await res.json();

        const detailedData = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );

        setPokemons(detailedData);
      } catch (error) {
        console.error('Error al obtener Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);                       //si no paso el array ,se ejecuta cada vez que se renderize el componente; cada vez que cambia el array vacio, ejecuta cuando se renderiza el componente

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FFCB05" />
        <Text>Cargando Pokémon...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: item.sprites.front_default }}
            style={styles.image}
          />
          <Text style={styles.name}>{item.name}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
});

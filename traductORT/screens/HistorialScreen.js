import { View, Text, TextInput, Button, StyleSheet } from 'react-native';



export default function HistorialScreen() {
    return(
    <View style={styles.container}>
        <Text >
            Historial de Traducciones
        </Text>
    </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
})
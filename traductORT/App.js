"use client"
import { StyleSheet, ActivityIndicator, View, TouchableOpacity, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { AuthProvider, useAuth } from "./context/AuthContext"
import AuthScreen from "./screens/AuthScreen"
import TraductorScreen from "./screens/TraductorScreen"
import HistorialScreen from "./screens/HistorialScreen"

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Traductor"
              component={TraductorScreen}
              options={({ navigation }) => ({
                title: "TraductORT",
                headerLeft: () => (
                  <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Historial")}>
                    <Text style={{ color: "#007AFF", fontSize: 16 }}>Historial</Text>
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="Historial"
              component={HistorialScreen}
              options={{
                title: "Historial de Traducciones",
                headerBackTitle: "Volver",
              }}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
})

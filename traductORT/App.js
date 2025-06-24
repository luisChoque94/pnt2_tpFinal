import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, View } from "react-native";
import TraductorScreen from "./screens/TraductorScreen";
import HistorialScreen from "./screens/HistorialScreen";

import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaFrameContext } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-web";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Traductor"
        component={TraductorScreen}
        options={{
          title: "  TraductORT",
          headerLeft: () => (
            <Button
              title="Historial"
              onPress={() => {
                navigation.navigate("HistorialScreen");
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="HistorialScreen"
        component={HistorialScreen}
        options={{
          title: "Historial de Traducciones",
         /*  headerRight: () => (
            <Button
              title="Traductor"
              onPress={() => {
                navigation.navigate("Traductor");
              }}
            />
          ), */
          headderBackTitle: "Volver",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (

      <NavigationContainer>
        <StackNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>

    /* <View>
        <TraductorScreen />
        <StatusBar style="auto" />
      </View> */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import * as React from "react"; //hooks para guardar informacion del usuario
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function TabTwoScreen() {
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  });

  console.log(redirectUri);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "393901545366-ilmcd1m73orkv9t0bkb3psg4ijqo59g4.apps.googleusercontent.com",
    iosClientId:
      "393901545366-e41dmd5np56cohopvdk0gtcapj62g9fv.apps.googleusercontent.com",
    androidClientId:
      "393901545366-nps5qjoqevn2qup8lar5ed1g2cmj93do.apps.googleusercontent.com",
    redirectUri,
  });

  //manejamos el flow de la autenticacion con un useEffect

  /*  React.useEffect(() => {
    if (response?.type == "success") {
      setAccessToken(response.authentication.accessToken); //este es el accessToken que nos permite acceder a la informacion del usuario
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]); //cada vez que hay un cambio en el login obtenemos los datos del usuario
 */

  React.useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      setAccessToken(response.authentication.accessToken);
      console.log(" Login exitoso:", response.authentication.accessToken);
    } else {
      console.log(" Login cancelado o fallido:", response);
    }
  }, [response]);

  //Obtenemos la informacion del usuario

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const useInfo = await response.json();
    setUser(useInfo);
  }

  //componente para renderizar la info del usuario si esta logeado

  /* const ShowUserInfo = () => {
        if(user){
            return {
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style= {{fontSize: 35, fontWeight: 'bold', marginBottom: 20}}>Welcome</Text>
                    <Image source={{uri: user.picture}} style= {{width: 100, height: 100, borderRadius: 50}} />
                    <Text style= {{fontSize: 20, fontWeight: 'bold'}}>{user.name}</Text>
                </View>
            }
        }
    } */

  const ShowUserInfo = () => {
    if (user) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 35, fontWeight: "bold", marginBottom: 20 }}>
            Welcome
          </Text>
          <Image
            source={{ uri: user.picture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user.name}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {user && <ShowUserInfo />}
      {user === null && (
        <>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>Welcome</Text>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              marginBottom: 20,
              color: "gray",
            }}
          >
            Please login
          </Text>
          <TouchableOpacity
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          >
            <Image
              source={require("./btn.png")}
              style={{ width: 300, height: 40 }}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
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

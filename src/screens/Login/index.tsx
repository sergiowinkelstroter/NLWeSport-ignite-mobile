import { Image, Text, TouchableOpacity } from "react-native";
import * as AuthSession from "expo-auth-session";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";

import { Background } from "../../components/Background";

import { styles } from "./styles";
import { GameController } from "phosphor-react-native";
import { THEME } from "../../theme";
import { useContext } from "react";
import { SignInContext } from "../../context/SignInContext";

export function Login() {
  const { setUser } = useContext(SignInContext);
  const navigation = useNavigation();

  async function handleDiscordSignIn() {
    const response = await AuthSession.startAsync({
      authUrl:
        "https://discord.com/api/oauth2/authorize?client_id=1022865950963421204&redirect_uri=https%3A%2F%2Fauth.expo.io%2F%40wink07%2Fmobile&response_type=token&scope=identify",
    });
    fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `Bearer ${response.params.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUser(data.username));

    navigation.navigate("home");
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Entrar"
          subtitle="Encontre seu duo e se diverta em seu game favorito"
        />

        <TouchableOpacity style={styles.button} onPress={handleDiscordSignIn}>
          <GameController color={THEME.COLORS.TEXT} size={20} />
          <Text style={styles.buttonTitle}>Entrar com Discord</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Background>
  );
}

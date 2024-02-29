import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { BASE_URL } from "../../constants/Urls";

export const LogIn = () => {
  const navigation = useNavigation();

  // const [username, setUsername] = useState<string>("Djoka1");
  // const [pass, setPass] = useState<string>("Djoka1");

  //user
  // const [username, setUsername] = useState<string>("anjica");
  // const [pass, setPass] = useState<string>("anjica");

  //admin
  // const [username, setUsername] = useState<string>("admin");
  // const [pass, setPass] = useState<string>("admin");

  //critic
  const [username, setUsername] = useState<string>("veljko");
  const [pass, setPass] = useState<string>("veljko");

  async function loginFunction(username: string, password: string) {
    try {
      const response = await axios.post(`${BASE_URL}auth/login`, {
        username,
        password,
      });

      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("role", response.data.role);

      navigation.navigate("Movies");
    } catch (error: any) {
      Alert.alert("Error: " + error.response.data.body.detail);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Welcome to movie database!</Text>
      <View>
        <View style={styles.groupedElements}>
          <Text style={styles.text}>Username:</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => setUsername(value)}
          />
        </View>
        <View style={styles.groupedElements}>
          <Text style={styles.text}>Password:</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => setPass(value)}
            secureTextEntry={true}
          />
        </View>
        <Button
          title="Login"
          onPress={() => {
            loginFunction(username, pass);
          }}
        />
      </View>
      <View>
        <Text style={styles.helpText}>Don't have an account? </Text>
        <Button title="SignUp" onPress={() => navigation.navigate("SignUp")} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    height: 400,
    marginTop: 20,
  },
  headline: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#8D89CA",
    marginBottom: "10%",
    marginTop: "10%",
  },
  text: {
    fontSize: 16,
    marginBottom: 3,
    color: "#8D89CA",
    fontWeight: "bold",
  },
  inputText: {
    borderBottomWidth: 2,
    borderColor: "#8D89CA",
    height: 30,
  },
  groupedElements: {
    height: 70,
    width: 250,
  },
  button: {
    backgroundColor: "#005691",
  },
  helpText: {
    marginTop: 20,
    fontSize: 16,
    alignContent: "center",
    justifyContent: "center",
  },
});

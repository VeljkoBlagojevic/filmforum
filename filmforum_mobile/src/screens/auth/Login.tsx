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
  TouchableOpacity,
  View,
} from "react-native";
import { BASE_URL } from "../../constants/Urls";

export const LogIn = () => {
  const navigation = useNavigation();

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
      <Text style={styles.headline}>Welcome to Movie Database!</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setUsername(value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setPass(value)}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => loginFunction(username, pass)}
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.helpText}>Don't have an account?</Text>
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate("SignUp")}
          color="#8D89CA"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  headline: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#333",
    marginBottom: 20,
  },
  formContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#8D89CA",
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "#8D89CA",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    marginTop: 20,
  },
  helpText: {
    fontSize: 16,
    color: "#333",
  },
});

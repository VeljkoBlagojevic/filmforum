import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
} from "react-native";
import { useValidInformation } from "../../../services/api";
import SelectDropdown from "react-native-select-dropdown";
import { Role } from "../../../domain/Role";

const roles: Role[] = [Role.USER, Role.CRITIC];

function validateEmail(email: string) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateAll(
  email: string,
  password: string,
  passwordAgain: string,
  username: string,
  role: Role
) {
  let errorMsg: string = "";

  if (!validateEmail) {
    errorMsg = errorMsg + " Email andresa nije validna";
  }
  if (email.length < 6) {
    errorMsg =
      errorMsg + " Email andresa nije validna. Mora imati vise od 6 karaktera.";
  }
  if (username === "" && username.length === 0) {
    errorMsg = errorMsg + " Username nije dobro unesen.";
  }
  if (password !== passwordAgain) {
    errorMsg = errorMsg + " Unete lozinke se ne poklapaju.";
  }
  if (password.length < 6) {
    errorMsg = errorMsg + " Lozinka mora imati vise od 6 karaktera.";
  }

  return errorMsg;
}

interface Props {
  setEmail: (value: string) => void;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setRole: (value: Role) => void;
}

function SignUpAccount(props: Props) {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [role, setRole] = useState<Role>(Role.USER);

  const { setValue } = useValidInformation();
  // const { value, setValue } = useValidInformation();

  const handleValidation = () => {
    let validationMsg = validateAll(email, password, passwordAgain, username, role);
    if (validationMsg === "") {
      props.setEmail(email);
      props.setUsername(username);
      props.setPassword(password);
      props.setRole(role);
      setValue(true);
    } else {
      Alert.alert(validationMsg.valueOf());
      setValue(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Welcome!</Text>
      <View style={styles.groupedElements}>
        <Text style={styles.text}>Insert your email address:</Text>
        <TextInput
          clearTextOnFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.inputText}
        />
      </View>
      <View style={styles.groupedElements}>
        <Text style={styles.text}>Insert your username:</Text>
        <TextInput
          clearTextOnFocus
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.inputText}
        />
      </View>
      <View style={styles.groupedElements}>
        <Text style={styles.text}>Insert your password:</Text>
        <TextInput
          clearTextOnFocus
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.inputText}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.groupedElements}>
        <Text style={styles.text}>Repeat password:</Text>
        <TextInput
          clearTextOnFocus
          value={passwordAgain}
          onChangeText={(text) => setPasswordAgain(text)}
          style={styles.inputText}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.groupedElements}>
        <Text style={styles.text}>Role:</Text>
        <SelectDropdown
          data={roles}
          onSelect={(selectedItem, index) => {
            setRole(selectedItem);
          }}
        />
      </View>
      <Button title="Check data!" onPress={() => handleValidation()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    height: 500,
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
    color: "#8D89CA",
    fontWeight: "bold",
    marginBottom: 3,
  },
  inputText: {
    borderBottomWidth: 2,
    borderColor: "#8D89CA",
    height: 30,
  },
  groupedElements: {
    height: 70,
    width: 280,
  },
});
export default SignUpAccount;

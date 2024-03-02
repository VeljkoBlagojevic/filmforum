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
import SelectDropdown from "react-native-select-dropdown";
import { Role } from "../../../domain/Role";
import { useValidInformation } from "../../../services/api";

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

  if (!validateEmail(email)) {
    errorMsg = "Email address is not valid.";
  }
  if (email.length < 6) {
    errorMsg = "Email address must be at least 6 characters.";
  }
  if (username === "" || username.length === 0) {
    errorMsg = "Username is not valid.";
  }
  if (password !== passwordAgain) {
    errorMsg = "Passwords do not match.";
  }
  if (password.length < 6) {
    errorMsg = "Password must be at least 6 characters.";
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

  const handleValidation = () => {
    let validationMsg = validateAll(
      email,
      password,
      passwordAgain,
      username,
      role
    );
    if (validationMsg === "") {
      props.setEmail(email);
      props.setUsername(username);
      props.setPassword(password);
      props.setRole(role);
      setValue(true);
    } else {
      Alert.alert(validationMsg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Welcome!</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address:</Text>
        <TextInput
          clearTextOnFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          clearTextOnFocus
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          clearTextOnFocus
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.inputText}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Repeat Password:</Text>
        <TextInput
          clearTextOnFocus
          value={passwordAgain}
          onChangeText={(text) => setPasswordAgain(text)}
          style={styles.inputText}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Role:</Text>
        <SelectDropdown
          data={roles}
          defaultValue={roles[0]}
          onSelect={(selectedItem, index) => {
            setRole(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          buttonStyle={styles.selectButton}
          buttonTextStyle={styles.selectButtonText}
          dropdownStyle={styles.dropdown}
          rowStyle={styles.dropdownRow}
          rowTextStyle={styles.dropdownText}
        />
      </View>
      <Button title="Validate" onPress={() => handleValidation()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  headline: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputText: {
    borderBottomWidth: 2,
    borderColor: "#8D89CA",
    height: 40,
    paddingHorizontal: 10,
  },
  selectButton: {
    borderWidth: 2,
    borderColor: "#8D89CA",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  selectButtonText: {
    color: "#8D89CA",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    borderWidth: 2,
    borderColor: "#8D89CA",
    borderRadius: 5,

  },
  dropdownRow: {
    paddingVertical: 10,
  },
  dropdownText: {
    color: "#8D89CA",
    fontWeight: "bold",
  },
});

export default SignUpAccount;

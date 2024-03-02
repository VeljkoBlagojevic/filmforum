import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Stepper from "react-native-stepper-ui";
import SignUpAccount from "./signUpScreens/SignUpAccount";
import SignUpPersonal from "./signUpScreens/SignUpPersonal";
import SignUpSubmit from "./signUpScreens/SignUpSubmit";
import { IsValidContext } from "../../services/api";
import { Role } from "../../domain/Role";
import axios from "axios";
import { BASE_URL } from "../../constants/Urls";

interface ReqisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  role: Role;
  profilePictureUri: string;
}

function SignUp() {
  const navigation = useNavigation();

  let [step, setStep] = useState<number>(0);

  let [value, setValue] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [role, setRole] = useState<Role>(Role.USER);

  useEffect(() => {
    setValue(false);
    if (step === 2) setValue(true);
  }, [step]);

  const content = [
    <SignUpAccount
      setEmail={setEmail}
      setUsername={setUsername}
      setPassword={setPassword}
      setRole={setRole}
    />,
    <SignUpPersonal
      setName={(text) => setName(text)}
      setSurname={(text) => setSurname(text)}
    />,
    <SignUpSubmit setImage={(image) => setImage(image)} />,
  ];

  const handleFinish = async () => {
    const registerRequest: ReqisterRequest = {
      firstname: name,
      lastname: surname,
      email: email,
      password: password,
      username: username,
      role: role,
      profilePictureUri: image.uri
    };
      await axios.post(`${BASE_URL}auth/register`, registerRequest);
      navigation.navigate("LogIn");
  };

  return (
    <IsValidContext.Provider value={{ value, setValue }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.stepperContainer}>
          <Stepper
            active={step}
            content={content}
            onNext={() => setStep((p) => p + 1)}
            onBack={() => setStep((p) => p - 1)}
            onFinish={handleFinish}
            wrapperStyle={styles.wrappper}
            stepStyle={styles.stepStyle}
            showButton={value}
            buttonStyle={styles.button}
            buttonTextStyle={{ alignSelf: "center" }}
          />
        </View>
      </SafeAreaView>
    </IsValidContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  stepperContainer: {
    width: "80%",
    height: 700,
    margin: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
  },
  wrappper: {
    color: "#38393E",
    margin: 5,
  },
  stepStyle: {
    backgroundColor: "blue",
    margin: 5,
  },
  button: {
    borderRadius: 4,
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "center",
    width: 100,
    paddingVertical: 12,
    backgroundColor: "#8D89CA",
  },
});

export default SignUp;

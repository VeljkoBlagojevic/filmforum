import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  Button,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useValidInformation } from "../../../services/api";
import axios from "axios";
import { BASE_URL } from "../../../constants/Urls";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  setImage: (value: ImagePicker.ImagePickerAsset) => void;
}

function SignUpSubmit(props: Props) {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>();
  const { value, setValue } = useValidInformation();

  const uploadPhoto = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
      });

    if (result.canceled) {
      return;
    }

    const imageAsset = result.assets[0];
    console.log("vise srece drugi put");
    setImage(imageAsset);
    props.setImage(imageAsset);
  };

  useEffect(() => {
    setValue(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>One last step...</Text>
      <View style={styles.profileImage}>
        {image !== null ? (
          <Image
            source={{
              uri: image?.uri,
              height: image?.height,
              width: image?.width,
            }}
            style={styles.image}
          />
        ) : (
          <Image source={require("./me.png")} style={styles.image} />
        )}
      </View>

      <Button title="Upload" onPress={uploadPhoto} />
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
    height: 400,
    marginTop: 20,
    paddingTop: 10,
  },
  headline: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#8D89CA",
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
    width: 250,
  },
  profileImage: {
    height: 150,
    width: 150,
    alignSelf: "center",
    margin: "2%",
    borderRadius: 100,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  buttonUpload: {
    backgroundColor: "#005691",
    height: "7%",
    width: 200,
    alignSelf: "center",
    borderRadius: 20,
    flexDirection: "column",
    marginBottom: "3%",
  },
});
export default SignUpSubmit;

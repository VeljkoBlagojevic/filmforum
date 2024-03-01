import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { BASE_URL } from "../../../constants/Urls";
import { MovieDTO } from "../../../domain/MovieDTO";

interface UpdateMovieModalProps {
  movie: MovieDTO | undefined;
  setMovie: (movie: MovieDTO) => void;
}

const UpdateMovieModal = ({ movie, setMovie }: UpdateMovieModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [overview, setOverview] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [runtime, setRuntime] = useState<string>("");
  const [tagline, setTagline] = useState<string>("");

  const handleConfirmUpdateMovie = async () => {
    const updatedMovie = {
      ...movie!,
      overview,
      budget,
      runtime,
      tagline,
    };

    try {
      const response = await axios.put(`${BASE_URL}movies`, updatedMovie, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      });
      setMovie(response.data);
      handleClose(); // Close the modal after successful update
    } catch (error: any) {
      Alert.alert(error.response.data.body.detail);
      console.error(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleClickOpen} title="Update Movie" color="#8D89CA" />
      <Modal visible={open} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.headline}>Update Movie</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Overview:</Text>
            <TextInput
              style={styles.inputText}
              autoFocus
              value={overview}
              onChangeText={setOverview}
              placeholder="Overview"
            />
            <Text style={styles.label}>Tagline:</Text>
            <TextInput
              style={styles.inputText}
              value={tagline}
              onChangeText={setTagline}
              placeholder="Tagline"
            />
            <Text style={styles.label}>Budget:</Text>
            <TextInput
              style={styles.inputText}
              value={budget}
              onChangeText={setBudget}
              placeholder="Budget"
              keyboardType="numeric"
            />
            <Text style={styles.label}>Runtime:</Text>
            <TextInput
              style={styles.inputText}
              value={runtime}
              onChangeText={setRuntime}
              placeholder="Runtime"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={handleClose}
              color="#8D89CA"
            />
            <Button
              title="Update"
              onPress={handleConfirmUpdateMovie}
              color="#8D89CA"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    margin: 50,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  headline: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#8D89CA",
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#8D89CA",
    fontWeight: "bold",
  },
  inputText: {
    borderBottomWidth: 1,
    borderColor: "#8D89CA",
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default UpdateMovieModal;

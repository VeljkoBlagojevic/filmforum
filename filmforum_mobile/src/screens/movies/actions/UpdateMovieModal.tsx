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
  const [overview, setOverview] = useState<string>();
  const [budget, setBudget] = useState<string>();
  const [runtime, setRuntime] = useState<string>();
  const [tagline, setTagline] = useState<string>();

  const handleConfirmUpdateMovie = async () => {
    const updatedMovie = {
      ...movie,
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
      // Assuming response.data contains the updated movie object
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
    <View>
      <Button onPress={handleClickOpen} title="Update Movie" />
      <Modal visible={open} animationType="slide">
        <View>
          <Text style={styles.headline}>Update Movie</Text>
          <Text>Overview:</Text>
          <TextInput
            style={styles.inputText}
            autoFocus
            value={overview}
            defaultValue={movie?.overview}
            onChangeText={setOverview}
            placeholder="Overview"
          />
          <Text>Tagline:</Text>
          <TextInput
            style={styles.inputText}
            value={tagline}
            defaultValue={movie?.tagline}
            onChangeText={setTagline}
            placeholder="Tagline"
          />
          <Text>Budget:</Text>
          <TextInput
            style={styles.inputText}
            value={budget}
            defaultValue={movie?.budget.toString()}
            onChangeText={setBudget}
            placeholder="Budget"
            keyboardType="numeric"
          />
          <Text>Runtime:</Text>
          <TextInput
            style={styles.inputText}
            value={runtime}
            defaultValue={movie?.runtime.toString()}
            onChangeText={setRuntime}
            placeholder="Runtime"
            keyboardType="numeric"
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "60%",
            }}
          >
            <Button title="Cancel" onPress={handleClose} />
            <Button title="Update" onPress={handleConfirmUpdateMovie} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
  },
  inputText: {
    borderBottomWidth: 2,
    borderColor: "#8D89CA",
  },
  groupedElements: {
    height: 70,
    width: 280,
  },
});

export default UpdateMovieModal;

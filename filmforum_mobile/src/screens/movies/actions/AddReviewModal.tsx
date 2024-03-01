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
import { Rating } from "react-native-ratings";
import { ReviewDTO } from "../../../domain/ReviewDTO";
import { UserDTO } from "../../../domain/UserDTO";
import { MovieDTO } from "../../../domain/MovieDTO";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../../constants/Urls";
import { useNavigation } from "@react-navigation/native";

interface AddReviewModalProps {
  movie: MovieDTO | undefined;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({ movie }) => {
  const navigation = useNavigation();

  const [content, setContent] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const handleAddReview = async () => {
    if (!movie) return;
    const newReview: ReviewDTO = {
      id: 0,
      movie: movie,
      author: {} as UserDTO,
      content: content,
      rating: rating,
      date: "",
    };

    try {
      await axios.post(`${BASE_URL}reviews`, newReview, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      });
      handleClose();
      navigation.navigate("Movies");
    } catch (error: any) {
      Alert.alert(error.response.data.body.detail);
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
      <Button onPress={handleClickOpen} title="Add Review" color="#8D89CA" />
      <Modal visible={open} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.headline}>Add Review</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Content:</Text>
            <TextInput
              style={styles.inputText}
              autoFocus
              multiline
              numberOfLines={4}
              onChangeText={setContent}
            />
            <Text style={styles.label}>Rating:</Text>
            <Rating
              type="star"
              startingValue={rating}
              ratingCount={10}
              onFinishRating={setRating}
              imageSize={30}
              style={{ paddingVertical: 10 }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={handleClose}
              color="#8D89CA"
            />
            <Button
              title="Submit"
              onPress={handleAddReview}
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

export default AddReviewModal;

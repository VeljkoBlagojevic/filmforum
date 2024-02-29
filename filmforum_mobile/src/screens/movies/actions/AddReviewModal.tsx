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
    <View style={styles.groupedElements}>
      <Button onPress={handleClickOpen} title="Add Review" />
      <Modal visible={open} onDismiss={handleClose}>
        <Text style={styles.headline}>Add Review</Text>
        <View>
          <Text>Content:</Text>
          <TextInput
            style={styles.inputText}
            autoFocus
            multiline
            numberOfLines={4}
            onChangeText={setContent}
          />
          <Rating
            type="star"
            startingValue={rating}
            ratingCount={10}
            onFinishRating={setRating}
          />
        </View>
        <Button title="Cancel" onPress={handleClose} />
        <Button title="Submit" onPress={handleAddReview} />
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

export default AddReviewModal;

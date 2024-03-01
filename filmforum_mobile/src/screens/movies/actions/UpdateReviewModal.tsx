import React, { useState, useEffect } from "react";
import { Rating } from "react-native-ratings";
import { ReviewDTO } from "../../../domain/ReviewDTO";
import {
  Alert,
  Button,
  Modal,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../../../constants/Urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

interface UpdateReviewModalProps {
  review: ReviewDTO | undefined;
  setReview: (review: ReviewDTO) => void;
}

export const UpdateReviewModal: React.FC<UpdateReviewModalProps> = ({
  review,
  setReview,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [updateReviewContent, setUpdateReviewContent] = useState<string>("");
  const [updateReviewRating, setUpdateReviewRating] = useState<number>(0);
  const navigation = useNavigation();

  useEffect(() => {
    if (review) {
      setUpdateReviewContent(review.content);
      setUpdateReviewRating(review.rating);
    }
  }, [review]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleUpdateReview() {
    const updatedReview = {
      ...review!,
      content: updateReviewContent,
      rating: updateReviewRating,
    };

    try {
      const response = await axios.put(`${BASE_URL}reviews`, updatedReview, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      });
      setReview(response.data);
      handleClose();
      navigation.navigate("Movies");
    } catch (error: any) {
      Alert.alert(error.response.data.body.detail);
    }
  }

  return (
    <View style={styles.container}>
      <Button onPress={handleClickOpen} title="Update Review" color="#8D89CA" />
      <Modal visible={open} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.headline}>Update Review</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Content:</Text>
            <TextInput
              style={styles.inputText}
              multiline
              numberOfLines={4}
              value={updateReviewContent}
              onChangeText={setUpdateReviewContent}
            />
            <Text style={styles.label}>Rating:</Text>
            <Rating
              type="star"
              ratingCount={10}
              startingValue={updateReviewRating}
              onFinishRating={setUpdateReviewRating}
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
              title="Update"
              onPress={handleUpdateReview}
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

export default UpdateReviewModal;

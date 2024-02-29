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

  const [updateReviewContent, setUpdateReviewContent] = useState<string>();
  const [updateReviewRating, setUpdateReviewRating] = useState<number>();

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
      ...review,
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
    <View style={styles.groupedElements}>
      <Button onPress={handleClickOpen} title="Update Review" />
      <Modal visible={open} onDismiss={handleClose}>
        <Text style={styles.headline}>Update Review</Text>
        <View>
          <Text>Content:</Text>
          <TextInput
            style={styles.inputText}
            multiline
            numberOfLines={4}
            value={updateReviewContent}
            defaultValue={review?.content}
            onChangeText={setUpdateReviewContent}
          />
          <Rating
            type="star"
            ratingCount={10}
            startingValue={review?.rating}
            onFinishRating={setUpdateReviewRating}
          />
        </View>
        <Button title="Cancel" onPress={handleClose} />
        <Button title="Update" onPress={handleUpdateReview} />
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

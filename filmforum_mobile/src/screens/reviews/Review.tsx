import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { ReviewDTO } from "../../domain/ReviewDTO";
import { useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import { MovieCard } from "../movies/MovieCard";

interface ReviewComponentProps {
  review: ReviewDTO;
  showAuthor: boolean;
  showMovie: boolean;
}

export const Review: React.FC<ReviewComponentProps> = ({
  review,
  showAuthor,
  showMovie,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.reviewContainer}>
      <Text style={styles.reviewContent}>{review.content}</Text>
      <View style={styles.reviewRating}>
        <Text>Rating: </Text>
        <Rating
          startingValue={review.rating}
          readonly
          fractions={1}
          imageSize={20}
          ratingCount={10}
        />
      </View>
      <Text style={styles.reviewDate}>Reviewed on: {review.date}</Text>
      {showAuthor && (
        <TouchableOpacity
          style={styles.reviewAuthor}
          onPress={() =>
            navigation.navigate("UserProfile", { userID: review.author.id })
          }
        >
          <Image
            source={{ uri: review?.author?.profilePictureUri }}
            style={{ width: 50, height: 50, borderRadius: 20 }}
          />
          <Text>
            Author: {review.author.firstname} {review.author.lastname}
          </Text>
        </TouchableOpacity>
      )}
      {showMovie && (
        <View style={styles.reviewMovie}>
          <MovieCard movie={review.movie} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    width: 500,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  reviewContent: {
    marginBottom: 10,
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewDate: {
    marginBottom: 10,
  },
  reviewAuthor: {
    marginBottom: 10,
    color: "blue",
  },
  reviewMovie: {
    marginBottom: 10,
  },
});

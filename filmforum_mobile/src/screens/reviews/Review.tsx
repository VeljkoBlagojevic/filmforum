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
        <Text style={styles.ratingText}>Rating: </Text>
        <Rating
          startingValue={review.rating}
          readonly
          fractions={1}
          imageSize={20}
          ratingCount={10}
          style={styles.ratingStars}
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
            style={styles.authorImage}
          />
          <Text style={styles.authorName}>
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
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  reviewContent: {
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 22,
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingText: {
    marginRight: 5,
    fontSize: 16,
  },
  ratingStars: {
    marginBottom: 5,
  },
  reviewDate: {
    marginBottom: 10,
    fontSize: 14,
    color: "#888",
  },
  reviewAuthor: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  authorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewMovie: {
    marginBottom: 10,
  },
});

export default Review;

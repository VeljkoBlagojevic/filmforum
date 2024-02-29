import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { ReviewDTO } from "../../domain/ReviewDTO";
import axios from "axios";
import { Review } from "./Review";
import { BASE_URL } from "../../constants/Urls";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface MovieReviewStatisticsProps {
  movieID: number;
}

const MovieReviewStatistics: React.FC<MovieReviewStatisticsProps> = ({
  movieID,
}) => {
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}reviews/movie/${movieID}`,
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
          }
        );
        setReviews(response.data.content);
      } catch (error: any) {
        Alert.alert("Error: " + error.response.data.body.detail);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.moviesReviewsContainer}>
      <View style={styles.movieReviewsInfo}>
        <Text style={styles.heading}>Reviews</Text>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Review
              review={review}
              showMovie={false}
              showAuthor={true}
              key={review.id}
            />
          ))
        ) : (
          <Text>No reviews available yet. Check back later for updates!</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  moviesReviewsContainer: {
    flex: 1,
  },
  movieReviewsInfo: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default MovieReviewStatistics;

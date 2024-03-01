import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  Linking,
} from "react-native";
import { Avatar, Chip } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ReviewDTO } from "../../domain/ReviewDTO";
import { BASE_URL } from "../../constants/Urls";
import { MovieDTO } from "../../domain/MovieDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cast } from "../people/Cast";
import { Crew } from "../people/Crew";
import MovieReviewStatistics from "../reviews/MovieReviewStatistics";
import { UserDTO } from "../../domain/UserDTO";
import UpdateMovieModal from "./actions/UpdateMovieModal";
import AddReviewModal from "./actions/AddReviewModal";
import { UpdateReviewModal } from "./actions/UpdateReviewModal";

const MovieDetails = () => {
  const route = useRoute();
  const { movieID } = route.params as { movieID: number }; // Adjust the type as per your movieID type

  const navigation = useNavigation();

  const [movie, setMovie] = useState<MovieDTO>();
  const [review, setReview] = useState<ReviewDTO>();
  const [reviewID, setReviewID] = useState<number>();
  const [isReviewed, setIsReviewed] = useState<boolean>(false);
  const [isInMyWatchlist, setIsInMyWatchlist] = useState<boolean>(false);

  const [currentUser, setCurrentUser] = useState<UserDTO>();

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get<MovieDTO>(
        `${BASE_URL}movies/${movieID}`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );
      setMovie(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToWatchlist = async () => {
    try {
      await axios.post(
        `${BASE_URL}watchlist/movies/${movieID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );
      setIsInMyWatchlist(true);
    } catch (error: any) {
      Alert.alert(error.response.data.body.detail);
    }
  };

  const removeFromWatchlist = async () => {
    try {
      await axios.delete(`${BASE_URL}watchlist/movies/${movieID}`, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      });
      setIsInMyWatchlist(false);
    } catch (error: any) {
      Alert.alert(error.response.data.body.detail);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get<UserDTO>(
        `${BASE_URL}users/currentlyLoggedIn`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );
      setCurrentUser(response.data);
    } catch (error: any) {
      Alert.alert(error.response.data.body.detail);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const checkIsInWatchlist = async () => {
      if (currentUser?.role !== "USER") return;
      try {
        const response = await axios.get(
          `${BASE_URL}watchlist/movies/${movieID}`,
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
          }
        );
        setIsInMyWatchlist(response.data);
      } catch (error: any) {
        Alert.alert(error.response.data.body.detail);
      }
    };

    checkIsInWatchlist();
  }, [movieID]);

  useEffect(() => {
    const isReviewed = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const responseIsReviewed = await axios.get(
          `${BASE_URL}reviews/movie/${movieID}/isReviewed`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviewID(responseIsReviewed.data);
        setIsReviewed(responseIsReviewed.data !== -1);

        if (responseIsReviewed.data === -1) return;
        const responseReview = await axios.get(
          `${BASE_URL}reviews/${responseIsReviewed.data}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReview(responseReview.data);
      } catch (error: any) {
        Alert.alert(error.response.data.body.detail);
      }
    };

    isReviewed();
  }, [movieID]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{movie?.title}</Text>
        {movie && movie?.backdropPath && (
          <Image
            style={styles.image}
            source={{ uri: movie?.backdropPath }}
          />
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.subtitle}>{movie?.tagline}</Text>
          <Button
            title="IMDb"
            onPress={() => Linking.openURL(movie?.imdb ?? "https://www.imdb.com/")}
            color="#4682B4"
          />
          <Text style={styles.text}>
            Genres:{" "}
            {movie?.genres && movie?.genres.length > 0 ? (
              <View style={styles.genreContainer}>
                {movie?.genres.map((genre) => (
                  <Chip
                    key={genre.id}
                    style={styles.chip}
                    avatar={
                      <Avatar.Text size={20} label={genre.name.substring(0, 1)} />
                    }
                    onPress={() =>
                      navigation.navigate("GenreScreen", { genreID: genre.id })
                    }
                  >
                    {genre.name}
                  </Chip>
                ))}
              </View>
            ) : (
              <Text>No genres found</Text>
            )}
          </Text>
          <Text style={styles.text}>Release Date: {movie?.releaseDate}</Text>
          <Text style={styles.overview}>{movie?.overview}</Text>
          {movie?.homepage && (
            <Button
              title="Homepage"
              onPress={() => Linking.openURL(movie?.homepage)}
              color="#4682B4"
            />
          )}
          <Text style={styles.text}>Budget: ${movie?.budget}</Text>
          <Text style={styles.text}>Runtime: {movie?.runtime} minutes</Text>
          {movie?.cast && (
            <>
              <Text style={styles.subtitle}>Cast</Text>
              <Cast cast={movie.cast} />
            </>
          )}
          {movie?.crew && (
            <>
              <Text style={styles.subtitle}>Crew</Text>
              <Crew crew={movie.crew} />
            </>
          )}
        </View>
      </View>
      <MovieReviewStatistics movieID={movieID} />
      {currentUser?.role === "USER" && (
        <View style={styles.buttonContainer}>
          {isInMyWatchlist ? (
            <Button
              onPress={removeFromWatchlist}
              title="Remove from watchlist"
              color="#FF6347"
            />
          ) : (
            <Button
              onPress={addToWatchlist}
              title="Add to Watchlist"
              color="#4682B4"
            />
          )}
        </View>
      )}
      {currentUser?.role === "CRITIC" && (
        <>
          {isReviewed ? (
            <UpdateReviewModal review={review} setReview={setReview} />
          ) : (
            <AddReviewModal movie={movie} />
          )}
        </>
      )}
      {currentUser?.role === "ADMIN" && (
        <UpdateMovieModal movie={movie} setMovie={setMovie} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555",
  },
  text: {
    marginBottom: 5,
    color: "#666",
  },
  overview: {
    marginBottom: 10,
    color: "#777",
    fontSize: 14,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  chip: {
    margin: 4,
    fontSize: 10,
    width: 100,
    height: 30,
    backgroundColor: "#f0f0f0",
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default MovieDetails;

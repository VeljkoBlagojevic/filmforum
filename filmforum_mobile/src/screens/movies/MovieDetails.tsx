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

export const MovieDetails = () => {
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
    <ScrollView>
      <Text style={{ fontSize: 24 }}>{movie?.title}</Text>
      {movie && (
        <>
          {movie?.backdropPath && (
            <Image
              style={{ width: "100%", height: 200 }}
              source={{ uri: movie?.backdropPath }}
            />
          )}
        </>
      )}
      <View>
        <Text style={{ fontSize: 20 }}>Tagline: {movie?.tagline}</Text>

        <Button
          title="IMDb"
          onPress={() => Linking.openURL(movie?.imdb ?? "imdb.com")}
        />

        <Text>
          Genres:{" "}
          {movie?.genres && movie?.genres.length > 0
            ? movie?.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  style={{ margin: 4 }}
                  avatar={
                    <Avatar.Text size={24} label={genre.name.substring(0, 1)} />
                  }
                  onPress={() =>
                    navigation.navigate("GenreScreen", { genreID: genre.id })
                  }
                >
                  {genre.name}
                </Chip>
              ))
            : "No genres found"}
        </Text>
        <Text>Release Date: {movie?.releaseDate}</Text>
        <Text>{movie?.overview}</Text>

        {movie?.homepage && (
          <Button
            title="HomePage"
            onPress={() => Linking.openURL(movie?.homepage)}
          />
        )}

        <Text>Budget: ${movie?.budget}</Text>
        <Text>Runtime: {movie?.runtime} minutes</Text>

        {movie?.cast && (
          <View>
            <Text style={{ fontSize: 24 }}>Cast</Text>
            <Cast cast={movie.cast} />
          </View>
        )}

        {movie?.crew && (
          <View>
            <Text style={{ fontSize: 24 }}>Crew</Text>
            <Crew crew={movie.crew} />
          </View>
        )}
      </View>
      <MovieReviewStatistics movieID={movieID} />

      {currentUser?.role === "USER" && (
        <>
          {/* Add/Remove from watchlist */}
          {isInMyWatchlist ? (
            <Button
              onPress={removeFromWatchlist}
              title="Remove from watchlist"
            />
          ) : (
            <Button onPress={addToWatchlist} title="Add to Watchlist" />
          )}
        </>
      )}

      {currentUser?.role === "CRITIC" &&
        (isReviewed ? (
          <UpdateReviewModal review={review} setReview={setReview} />
        ) : (
          <AddReviewModal movie={movie} />
        ))}

      {currentUser?.role === "ADMIN" && (
        <UpdateMovieModal movie={movie} setMovie={setMovie} />
      )}
    </ScrollView>
  );
};

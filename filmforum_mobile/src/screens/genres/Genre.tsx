import React, { useEffect, useState } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import { MovieDTO } from "../../domain/MovieDTO";
import axios from "axios";
import { Genre } from "../../domain/Genre";
import { BASE_URL } from "../../constants/Urls";
import { useRoute } from "@react-navigation/native";
import { MovieCard } from "../movies/MovieCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GenreScreen = () => {
  const route = useRoute();
  const { genreID } = route.params as { genreID: number };
  const [movies, setMovies] = useState<MovieDTO[]>([]);
  const [genre, setGenre] = useState<Genre>();

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await axios.get<Genre>(
          `${BASE_URL}genres/${genreID}`,
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
          }
        );
        setGenre(response.data);

        const moviesResponse = await axios.get(
          `${BASE_URL}genres/${genreID}/movies`,
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
          }
        );
        setMovies(moviesResponse.data.content);
      } catch (error: any) {
        Alert.alert("Error: " + error.response.data.body.detail);
      }
    };

    fetchGenre();
  }, [genreID]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 16,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{genre?.name}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          marginTop: 16,
        }}
      >
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </View>
    </ScrollView>
  );
};

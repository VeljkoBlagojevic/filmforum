import React, { useEffect, useState } from "react";
import { View, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/Urls";
import { MovieDTO } from "../../domain/MovieDTO";
import { MovieCard } from "./MovieCard";

export const Movies = () => {
  const [movies, setMovies] = useState<MovieDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}movies`, {
          params: {
            size: 5,
            page: currentPage,
            title: searchTerm,
          },
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        });
        setTotalPages(response.data.totalPages);
        setMovies(response.data.content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage, searchTerm]);

  const nextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by title"
          value={searchTerm}
          onChangeText={handleSearchChange}
          style={styles.input}
        />
      </View>
      <ScrollView style={styles.moviesContainer}>
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        <Button
          title="Previous"
          onPress={previousPage}
          disabled={currentPage === 0}
          color="#8D89CA"
        />
        <Button
          title="Next"
          onPress={nextPage}
          disabled={currentPage === totalPages - 1}
          color="#8D89CA"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#8D89CA",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  moviesContainer: {
    flex: 1,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
});

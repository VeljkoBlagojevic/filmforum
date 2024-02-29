import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Assuming you are using React Navigation for navigation
import { MovieDTO } from "../../domain/MovieDTO";

interface MovieCardComponentProps {
  movie: MovieDTO;
}

export const MovieCard: React.FC<MovieCardComponentProps> = ({ movie }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("MovieDetails", { movieID: movie.id })}
    >
      <Image
        source={{ uri: movie.posterPath }} // Assuming posterPath is a URL
        style={styles.moviePoster}
        resizeMode="cover"
      />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>{movie.title}</Text>
        <Text style={styles.movieReleaseYear}>
          {movie.releaseDate.substring(0, 4)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    marginBottom: 20,
  },
  moviePoster: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  movieInfo: {
    padding: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  movieReleaseYear: {
    fontSize: 16,
    color: "gray",
  },
});

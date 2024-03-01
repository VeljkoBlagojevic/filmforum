import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  Linking,
  Image,
  StyleSheet,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import { PersonDTO } from "../../domain/PersonDTO";
import { MovieDTO } from "../../domain/MovieDTO";
import { MovieCard } from "../movies/MovieCard";
import { BASE_URL } from "../../constants/Urls";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  PersonDetails: { personID: string };
};

type PersonDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "PersonDetails"
>;

const PersonDetails: React.FC = () => {
  const route = useRoute<PersonDetailsScreenRouteProp>();
  const { personID } = route.params;
  const [person, setPerson] = useState<PersonDTO>({} as PersonDTO);
  const [movies, setMovies] = useState<MovieDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}people/${personID}`, {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        });
        setPerson(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPersonsMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}people/${personID}/movies`,
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
          }
        );
        setMovies(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPersonDetails();
    fetchPersonsMovies();
  }, [personID]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image style={styles.image} source={{ uri: person?.profilePath }} />
          <View style={styles.personInfo}>
            <Text style={styles.personName}>{person?.name}</Text>
            <View style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Gender:</Text>
              <Text style={styles.detailText}>{person?.gender}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Birthday:</Text>
              <Text style={styles.detailText}>{person?.birthday}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Place of Birth:</Text>
              <Text style={styles.detailText}>{person?.placeOfBirth}</Text>
            </View>
            <Button
              title="IMDb"
              onPress={() => Linking.openURL(person?.imdb)}
              color="#4682B4"
            />
          </View>
        </View>
        <Text style={styles.biography}>{person?.biography}</Text>
      </View>
      <View style={styles.moviesContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          movies?.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 225,
    borderRadius: 10,
    marginRight: 20,
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  detailText: {
    fontSize: 12,
  },
  biography: {
    fontSize: 10,
    color: "#555",
  },
  moviesContainer: {
    marginTop: 20,
  },
});

export default PersonDetails;

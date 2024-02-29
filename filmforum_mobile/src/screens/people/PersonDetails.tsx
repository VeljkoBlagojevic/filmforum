import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  Linking,
  Image,
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

export const PersonDetails: React.FC = () => {
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
    <ScrollView>
      <View>
        <View>
          <Image
            style={{ width: "100%", height: 450 }}
            source={{ uri: person?.profilePath }}
          />
        </View>
        <View>
          <Text>{person?.name}</Text>
          <Text>Gender: {person?.gender}</Text>
          <Text>Birthday: {person?.birthday}</Text>
          <Text>Place of Birth: {person?.placeOfBirth}</Text>
          <Button title="IMDb" onPress={() => Linking.openURL(person?.imdb)} />
          <Text>{person?.biography}</Text>
        </View>
      </View>
      <View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          movies?.map((movie) => <MovieCard movie={movie} key={movie.id} />)
        )}
      </View>
    </ScrollView>
  );
};

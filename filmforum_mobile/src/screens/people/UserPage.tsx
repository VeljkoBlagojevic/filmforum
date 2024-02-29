import React, { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import axios from "axios";
import { UserDTO } from "../../domain/UserDTO";
import { ReviewDTO } from "../../domain/ReviewDTO";
import { WatchListDTO } from "../../domain/WatchListDTO";
import { useRoute } from "@react-navigation/native";
import { BASE_URL } from "../../constants/Urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MovieCard } from "../movies/MovieCard";
import { Review } from "../reviews/Review";
import { ScrollView } from "react-native-gesture-handler";
import { Role } from "../../domain/Role";

export const UserProfileScreen: React.FC = () => {
  const route = useRoute();
  const { userID } = route.params as { userID: number };
  const [user, setUser] = useState<UserDTO>();
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);
  const [watchlist, setWatchlist] = useState<WatchListDTO>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<UserDTO>(
          `${BASE_URL}users/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data);
      } catch (error: any) {
        Alert.alert("Error: " + error.response.data.body.detail);
      }
    };

    fetchUser();
  }, [userID]);

  useEffect(() => {
    if (user) {
      if (user.role === Role.USER) {
        fetchWatchList();
      } else if (user.role === Role.CRITIC) {
        fetchReviews();
      }
    }
  }, [user]);

  const fetchWatchList = async () => {
    try {
      if (user?.id) {
        const response = await axios.get(
          `${BASE_URL}watchlist/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
          }
        );
        setWatchlist(response.data);
      }
    } catch (error: any) {
      Alert.alert("Error: " + error.response.data.body.detail);
    }
  };

  const fetchReviews = async () => {
    try {
      if (user?.id) {
        const response = await axios.get(`${BASE_URL}reviews/user/${userID}`, {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        });
        setReviews(response.data.content);
      }
    } catch (error: any) {
      Alert.alert("Error: " + error.response.data.body.detail);
    }
  };

  return (
    <ScrollView>
      <View>
        <View>
          <Text>
            {user?.firstname} {user?.lastname}
          </Text>
          <Text>{user?.username}</Text>
          <Text>{user?.email}</Text>
          <Image
            source={{ uri: user?.profilePictureUri }}
            style={{ width: 250, height: 250 }}
          />
        </View>
        {user?.role === Role.USER && watchlist && (
          <View>
            <Text>Movies in WatchList:</Text>
            <View>
              {watchlist.movies.map((movie) => (
                <View key={movie.id}>
                  <MovieCard movie={movie} />
                </View>
              ))}
            </View>
          </View>
        )}
        {user?.role === Role.CRITIC && reviews && (
          <View>
            <Text>Reviews:</Text>
            <View>
              {reviews?.map((review) => (
                <Review
                  review={review}
                  showAuthor={false}
                  showMovie={true}
                  key={review.id}
                ></Review>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

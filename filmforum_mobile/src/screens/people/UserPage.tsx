import React, { useEffect, useState } from "react";
import { Alert, Image, Text, View, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import { UserDTO } from "../../domain/UserDTO";
import { ReviewDTO } from "../../domain/ReviewDTO";
import { WatchListDTO } from "../../domain/WatchListDTO";
import { useRoute } from "@react-navigation/native";
import { BASE_URL } from "../../constants/Urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MovieCard } from "../movies/MovieCard";
import { Review } from "../reviews/Review";
import { Role } from "../../domain/Role";
import { Buffer } from "buffer";

const UserProfileScreen: React.FC = () => {
  const route = useRoute();
  const { userID } = route.params as { userID: number };
  const [user, setUser] = useState<UserDTO>();
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);
  const [watchlist, setWatchlist] = useState<WatchListDTO>();
  const [profilePicture, setProfilePicture] = useState("");
  const profilePictureUri = user?.profilePictureUri;

  const getProfilePicture = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}users/${user?.id}/profilePicture`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "arraybuffer",
        }
      );

      const buffer = Buffer.from(response.data, "binary");
      const base64String = buffer.toString("base64");
      setProfilePicture(`data:image/jpeg;base64,${base64String}`);
    } catch (error) {}
  };

  useEffect(() => {
    getProfilePicture();
  }, [profilePictureUri]);

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.userContainer}>
        <Text style={styles.userName}>
          {user?.firstname} {user?.lastname}
        </Text>
        <Text style={styles.userInfo}>{user?.username}</Text>
        <Text style={styles.userInfo}>{user?.email}</Text>
        <Image source={{ uri: profilePicture }} style={styles.userImage} />
      </View>
      {user?.role === Role.USER && watchlist && (
        <View style={styles.watchlistContainer}>
          <Text style={styles.sectionTitle}>Movies in WatchList:</Text>
          {watchlist.movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </View>
      )}
      {user?.role === Role.CRITIC && reviews && (
        <View style={styles.reviewsContainer}>
          <Text style={styles.sectionTitle}>Reviews:</Text>
          {reviews?.map((review) => (
            <Review
              review={review}
              showAuthor={false}
              showMovie={true}
              key={review.id}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  userContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  userImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 10,
  },
  watchlistContainer: {
    marginBottom: 20,
  },
  reviewsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default UserProfileScreen;

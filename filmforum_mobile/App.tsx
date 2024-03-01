import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogIn } from "./src/screens/auth/Login";
import SignUp from "./src/screens/auth/SignUp";
import { Movies } from "./src/screens/movies/Movies";
import { GenreScreen } from "./src/screens/genres/Genre";
import PersonDetails from "./src/screens/people/PersonDetails";
import UserProfileScreen from "./src/screens/people/UserPage";
import MovieDetails from "./src/screens/movies/MovieDetails";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Movies" component={Movies} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
        <Stack.Screen name="PersonDetails" component={PersonDetails} />
        <Stack.Screen name="GenreScreen" component={GenreScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

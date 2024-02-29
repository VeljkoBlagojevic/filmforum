import React from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { PersonDTO } from "../../domain/PersonDTO";
import { useNavigation } from "@react-navigation/native";

interface PersonCardComponentProps {
  person: PersonDTO;
}

export const PersonCard: React.FC<PersonCardComponentProps> = ({ person }) => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate("PersonDetails", { personID: person.id });
  };

  return (
    <TouchableOpacity style={styles.personCard} onPress={handleClick}>
      <Image style={styles.personImage} source={{ uri: person.profilePath }} />
      <Text style={styles.personName}>{person.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  personCard: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
  },
  personImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  personName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});

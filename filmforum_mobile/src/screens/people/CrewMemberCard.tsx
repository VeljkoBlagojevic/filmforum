import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CrewMemberDTO } from "../../domain/CrewMemberDTO";
import { PersonCard } from "./PersonCard";

interface CrewMemberCardComponentProps {
  crewMember: CrewMemberDTO;
}

export const CrewMemberCard: React.FC<CrewMemberCardComponentProps> = ({
  crewMember,
}) => {
  return (
    <View style={styles.container}>
      <PersonCard person={crewMember.person} />
      <Text style={styles.job}>{crewMember.job}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginBottom: 20,
    padding: 5,
    margin: 5,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  job: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default CrewMemberCard;

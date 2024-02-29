import React from "react";
import { View, Text } from "react-native";
import { CrewMemberDTO } from "../../domain/CrewMemberDTO";
import { PersonCard } from "./PersonCard";

interface CrewMemberCardComponentProps {
  crewMember: CrewMemberDTO;
}

export const CrewMemberCard: React.FC<CrewMemberCardComponentProps> = ({
  crewMember,
}) => {
  return (
    <View>
      <PersonCard person={crewMember.person} />
      <Text>{crewMember.job}</Text>
    </View>
  );
};

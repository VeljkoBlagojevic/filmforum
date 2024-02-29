import React from "react";
import { FlatList } from "react-native";
import { CrewMemberDTO } from "../../domain/CrewMemberDTO";
import { CrewMemberCard } from "./CrewMemberCard";

interface CrewComponentProps {
    crew: CrewMemberDTO[];
}

export const Crew = ({ crew }: CrewComponentProps) => {
  const renderItem = ({ item }: { item: CrewMemberDTO }) => (
    <CrewMemberCard crewMember={item} />
  );

  return (
    <FlatList
      horizontal
      data={crew}
      renderItem={renderItem}
      keyExtractor={(actor) => actor.creditId}
    />
  );
};

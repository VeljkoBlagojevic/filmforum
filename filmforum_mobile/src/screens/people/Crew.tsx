import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { CrewMemberDTO } from "../../domain/CrewMemberDTO";
import { CrewMemberCard } from "./CrewMemberCard";

interface CrewComponentProps {
  crew: CrewMemberDTO[];
}

export const Crew: React.FC<CrewComponentProps> = ({ crew }) => {
  const renderItem = ({ item }: { item: CrewMemberDTO }) => (
    <CrewMemberCard crewMember={item} />
  );

  return (
    <FlatList
      horizontal
      data={crew}
      renderItem={renderItem}
      keyExtractor={(actor) => actor.creditId}
      contentContainerStyle={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: 10,
  },
});

export default Crew;

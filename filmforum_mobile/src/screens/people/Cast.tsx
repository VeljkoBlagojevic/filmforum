import React from "react";
import { FlatList } from "react-native";
import { ActorDTO } from "../../domain/ActorDTO";
import { ActorCard } from "./ActorCard";

interface CastComponentProps {
  cast: ActorDTO[];
}

export const Cast = ({ cast }: CastComponentProps) => {
  const renderItem = ({ item }: { item: ActorDTO }) => (
    <ActorCard actor={item} />
  );

  return (
    <FlatList
      horizontal
      data={cast}
      renderItem={renderItem}
      keyExtractor={(actor) => actor.creditId}
    />
  );
};

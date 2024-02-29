import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActorDTO } from '../../domain/ActorDTO';
import { PersonCard } from './PersonCard';

interface ActorCardComponentProps {
    actor: ActorDTO;
}

export const ActorCard: React.FC<ActorCardComponentProps> = ({ actor }) => {
    return (
        <View style={styles.actorCard}>
            <PersonCard person={actor.person} />
            <Text style={styles.character}>{actor.character}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    actorCard: {
        // Define styles for the container view
    },
    character: {
        // Define styles for the character text
    },
});

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
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 20,
        padding: 5,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    character: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
    },
});

export default ActorCard;

import React from 'react';
import { ActorDTO } from '../../domain/ActorDTO';
import PersonCardComponent from './PersonCardComponent';
import './ActorCard.css';

interface ActorCardComponentProps {
    actor: ActorDTO;
}

const ActorCardComponent = ({ actor }: ActorCardComponentProps) => {
    return (
        <div className="actor-card">
            <PersonCardComponent person={actor.person} />
            <div className="character">{actor.character}</div>
        </div>
    );
};

export default ActorCardComponent;

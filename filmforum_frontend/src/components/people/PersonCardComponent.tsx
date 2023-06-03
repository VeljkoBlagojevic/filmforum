import React from 'react';
import {PersonDTO} from '../../domain/PersonDTO';
import {useNavigate} from 'react-router';
import {CardMedia, Container} from '@mui/material';
import "./PersonCard.css";

interface PersonCardComponentProps {
    person: PersonDTO;
}

const PersonCardComponent: React.FC<PersonCardComponentProps> = ({person}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/people/${person.id}`);
    };

    return (
        <Container className="person-card" onClick={handleClick}>
            <CardMedia className="person-image" component="img" image={person?.profilePath} alt={person?.name}/>
            <div className="person-name">{person.name}</div>
        </Container>
    );
};

export default PersonCardComponent;

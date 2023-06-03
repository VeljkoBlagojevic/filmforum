import React from 'react';
import { useNavigate } from 'react-router';
import { MovieDTO } from '../../domain/MovieDTO';
import { Card, CardMedia, Container } from '@mui/material';
import './MovieCard.css';

interface MovieCardComponentProps {
    movie: MovieDTO;
}

const MovieCardComponent: React.FC<MovieCardComponentProps> = ({ movie }) => {
    const navigate = useNavigate();

    return (
        <Container className="movie-card" style={{ width: '350px' }} onClick={() => navigate(`/movies/${movie.id}`)}>
            <Card>
                <CardMedia className="movie-poster" component="img" image={movie?.posterPath} alt={movie.title} />
            </Card>
            <div className="movie-info">
                <p className="movie-title">{movie?.title}</p>
                <p className="movie-release-year">{movie?.releaseDate.substring(0, 4)}</p>
            </div>
        </Container>
    );
};

export default MovieCardComponent;

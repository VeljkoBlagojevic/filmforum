import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { PersonDTO } from '../../domain/PersonDTO';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Grid,
    Typography,
} from '@mui/material';
import MovieCardComponent from '../movies/MovieCardComponent';
import { MovieDTO } from '../../domain/MovieDTO';
import "./PersonDetails.css";

const PersonDetailsComponent = () => {
    const { personID } = useParams();
    const [person, setPerson] = useState<PersonDTO>({} as PersonDTO);
    const [movies, setMovies] = useState<MovieDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPersonDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/people/${personID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                setPerson(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchPersonsMovies = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/people/${personID}/movies`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                setMovies(response.data.content);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPersonDetails();
        fetchPersonsMovies();
    }, [personID]);

    return (
        <Grid container spacing={2} className="person-details-container">
            <Grid item xs={12} sm={4}>
                <Card className="person-photo">
                    <CardMedia
                        component="img"
                        image={person?.profilePath}
                        alt={person?.name}
                        key={person?.id}
                    />
                </Card>
            </Grid>
            <Grid item xs={12} sm={8} >
                <Card >
                    <CardContent className="person-info">
                        <Typography variant="h5" component="div" className="person-name">
                            {person?.name}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            className="person-details"
                        >
                            Gender: {person?.gender}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            className="person-details"
                        >
                            Birthday: {person?.birthday}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            className="person-details"
                        >
                            Place of Birth: {person?.placeOfBirth}
                        </Typography>
                        <Button variant="contained" onClick={() => window.open(person?.imdb, '_blank')}>
                            IMDb
                        </Button>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            className="person-biography"
                        >
                            {person?.biography}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <div className="person-movie-card-container">
                        {movies?.map((movie) => (
                            <MovieCardComponent movie={movie} key={movie.id} />
                        ))}
                    </div>
                )}
            </Grid>
        </Grid>
    );
};

export default PersonDetailsComponent;

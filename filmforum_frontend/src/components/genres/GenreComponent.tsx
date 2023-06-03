import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MovieDTO } from '../../domain/MovieDTO';
import { Genre } from '../../domain/Genre';
import axios from 'axios';
import MovieCardComponent from "../movies/MovieCardComponent";
import { Box, Typography } from '@mui/material';

const GenreComponent = () => {
    const [movies, setMovies] = useState<MovieDTO[]>([]);
    const [genre, setGenre] = useState<Genre | undefined>(undefined);
    const { genreID } = useParams();

    useEffect(() => {
        const fetchGenre = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/genres/${genreID}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setGenre(response.data);

                const moviesResponse = await axios.get(`http://localhost:8080/api/v1/genres/${genreID}/movies`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setMovies(moviesResponse.data.content);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGenre();
    }, [genreID]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            color="#FFFFFF"
            padding={2}
        >
            <Typography variant="h1">{genre?.name}</Typography>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-evenly"
                flexWrap="wrap"
                marginTop={2}
            >
                {movies?.map(movie => (
                    <MovieCardComponent movie={movie} key={movie.id} />
                ))}
            </Box>
        </Box>
    );
};

export default GenreComponent;

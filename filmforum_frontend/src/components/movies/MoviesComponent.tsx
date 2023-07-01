import React, { useEffect, useState } from 'react';
import { MovieDTO } from '../../domain/MovieDTO';
import axios from 'axios';
import MovieCardComponent from './MovieCardComponent';
import { Button, TextField } from '@mui/material';
import './Movies.css';

const MoviesComponent = () => {
    const [movies, setMovies] = useState<MovieDTO[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/movies', {
                    params: {
                        size: 5,
                        page: currentPage,
                        title: searchTerm, // Pass the search term as a parameter
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTotalPages(response.data.totalPages);
                setMovies(response.data.content);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [currentPage, searchTerm]);

    const nextPage = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <div className="search-container">
                <TextField
                    label="Search by title"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    variant="outlined"
                />
            </div>
            <div className="movies-container">
                {movies.map((movie) => (
                    <MovieCardComponent movie={movie} key={movie.id} />
                ))}
            </div>
            <div className="pagination">
                <Button
                    onClick={previousPage}
                    disabled={currentPage === 0}
                    className="pagination-button"
                >
                    Previous
                </Button>
                <Button
                    onClick={nextPage}
                    disabled={currentPage === totalPages - 1}
                    className="pagination-button"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default MoviesComponent;

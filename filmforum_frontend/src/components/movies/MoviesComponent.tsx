import React, {useEffect, useState} from 'react';
import {MovieDTO} from '../../domain/MovieDTO';
import axios from 'axios';
import MovieCardComponent from './MovieCardComponent';
import {Button} from '@mui/material';
import './Movies.css';

const MoviesComponent = () => {
    const [movies, setMovies] = useState<MovieDTO[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/movies', {
                    params: {
                        size: 5,
                        page: currentPage,
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
    }, [currentPage]);

    const nextPage = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };

    return (
        <div>
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
            <div className="movies-container">
                {movies.map((movie) => <MovieCardComponent movie={movie} key={movie.id}/>)}
            </div>
        </div>
    );
};

export default MoviesComponent;

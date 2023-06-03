import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Typography} from '@mui/material';
import {UserDTO} from '../../domain/UserDTO';
import {ReviewDTO} from '../../domain/ReviewDTO';
import {WatchListDTO} from '../../domain/WatchListDTO';
import ReviewComponent from '../review/ReviewComponent';
import MovieCardComponent from '../movies/MovieCardComponent';
import {useParams} from 'react-router';
import "./User.css"

const UserPageComponent = () => {
    const {userID} = useParams();
    const [user, setUser] = useState<UserDTO | null>(null);
    const [reviews, setReviews] = useState<ReviewDTO[]>([]);
    const [watchlist, setWatchlist] = useState<WatchListDTO | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/users/${userID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [userID]);

    useEffect(() => {
        if (user) {
            if (user.role === 'USER') {
                fetchWatchList();
            } else if (user.role === 'CRITIC') {
                fetchReviews();
            }
        }
    }, [user]);

    const fetchWatchList = async () => {
        try {
            if (user && user.id) {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/watchlist/user/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                setWatchlist(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchReviews = async () => {
        try {
            if (user && user.id) {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/reviews/user/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                setReviews(response.data.content);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {user ? (
                <div>
                    <div className="user-info">
                        <Typography variant="h3">User Information:</Typography>
                        <Typography variant="h4">First Name: {user.firstname}</Typography>
                        <Typography variant="h4">Last Name: {user.lastname}</Typography>
                        <Typography variant="h4">Username: {user.username}</Typography>
                        <Typography variant="body1">Email: {user.email}</Typography>
                    </div>
                    {user.role === 'USER' && watchlist && (
                        <div className="watchlist-container">
                            <Typography variant="h3">Movies in WatchList:</Typography>
                            <div className="watchlist">
                                {watchlist.movies.map((movie) => (
                                    <div className="movie-card-container" key={movie.id}>
                                        <MovieCardComponent movie={movie}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {user.role === 'CRITIC' && reviews && (
                        <div className="review-list-container">
                            <Typography variant="h3">Reviews:</Typography>
                            <div className="review-list">
                                {reviews.map((review) => (
                                    <div key={review.id}>
                                        <ReviewComponent review={review} showMovie={true} showAuthor={false}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default UserPageComponent;

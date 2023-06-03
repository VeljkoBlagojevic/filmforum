import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router';
import {MovieDTO} from '../../domain/MovieDTO';
import CastComponent from '../people/CastComponent';
import CrewComponent from '../people/CrewComponent';
import MovieReviewStatistics from '../review/MovieReviewStatistics';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Rating,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import {ReviewDTO} from '../../domain/ReviewDTO';
import {UserDTO} from '../../domain/UserDTO';
import "./MovieDetails.css";

const MovieDetailsComponent = () => {
    const {movieID} = useParams();
    const userRole = localStorage.getItem('role');
    const navigate = useNavigate();

    const [movie, setMovie] = useState<MovieDTO>({} as MovieDTO);
    const [review, setReview] = useState<ReviewDTO>({} as ReviewDTO);
    const [reviewID, setReviewID] = useState<number>(0);
    const [isReviewed, setIsReviewed] = useState<boolean>(true);
    const [isInMyWatchlist, setIsInMyWatchlist] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [updateReviewContent, setUpdateReviewContent] = useState(review.content);
    const [updateReviewRating, setUpdateReviewRating] = useState(review.rating);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/movies/${movieID}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setMovie(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMovieDetails();
    }, []);

    useEffect(() => {
        const isReviewed = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/reviews/movie/${movieID}/isReviewed`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                setReviewID(response.data);
                setIsReviewed(response.data !== -1);
            } catch (error) {
                console.error(error);
            }
        };

        isReviewed();
    }, [movieID]);

    useEffect(() => {
        const checkIsInWatchlist = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/watchlist/movies/${movieID}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setIsInMyWatchlist(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        checkIsInWatchlist();
    }, [movieID]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmUpdateMovie = async () => {
        const updatedOverview = (document.getElementById(
            'updateOverview'
        ) as HTMLInputElement)?.value;
        const updatedBudget = parseInt(
            (document.getElementById('updateBudget') as HTMLInputElement)?.value || '0',
            10
        );
        const updatedRuntime = parseInt(
            (document.getElementById('updateRuntime') as HTMLInputElement)?.value || '0',
            10
        );
        const updatedTagline = (document.getElementById(
            'updateTagline'
        ) as HTMLInputElement)?.value;

        const updatedMovie = {
            ...movie,
            overview: updatedOverview,
            budget: updatedBudget,
            runtime: updatedRuntime,
            tagline: updatedTagline,
        };

        try {
            const response = await axios.put(`http://localhost:8080/api/v1/movies`, updatedMovie, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setMovie(response.data);
            handleClose(); // Close the modal after successful update
        } catch (error: any) {
            setError(error.response.data.body.detail);
            console.error(error);
        }
    };


    const handlePostReview = async () => {
        const newReview: ReviewDTO = {
            id: 0,
            movie: movie,
            author: {} as UserDTO,
            content: review.content,
            rating: review.rating,
            date: "",
        };

        try {
            const response = await axios.post(`http://localhost:8080/api/v1/reviews`, newReview, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setReview(response.data);
            handleClose();
            window.location.reload();
        } catch (error: any) {
            setError(error.response.data.body.detail);
            console.error(error);
        }
    };

    const handleUpdateReview = async () => {
        const updatedReview: ReviewDTO = {
            ...review,
            content: updateReviewContent,
            rating: updateReviewRating,
        };

        try {
            const response = await axios.put(`http://localhost:8080/api/v1/reviews`, updatedReview, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setReview(response.data);
            handleClose()
            window.location.reload();
        } catch (error: any) {
            setError(error.response.data.body.detail);
            console.error(error);
        }
    };

    const handleClickOpenAndFetchReview = async () => {
        handleClickOpen();

        try {
            const response = await axios.get(`http://localhost:8080/api/v1/reviews/${reviewID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setReview(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addToWatchlist = async () => {
        try {
            await axios.post(
                `http://localhost:8080/api/v1/watchlist/movies/${movieID}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setIsInMyWatchlist(true);
        } catch (error: any) {
            setError(error.response.data.body.detail);
            console.error(error);
        }
    };


    const removeFromWatchlist = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/watchlist/movies/${movieID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setIsInMyWatchlist(false);
        } catch (error: any) {
            setError(error.response.data.body.detail);
            console.error(error);
        }
    };

    const handleCloseError = () => {
        setError('');
    };


    return (
        <>
            <div className="movie-details">
                {/* Movie details rendering */}
                <Typography variant="h2">{movie.title}</Typography>
                {movie && (
                    <>
                        {/*{movie.posterPath && (*/}
                        {/*    <Box*/}
                        {/*        component="img"*/}
                        {/*        alt={movie.title}*/}
                        {/*        src={movie?.posterPath}*/}
                        {/*    />*/}
                        {/*)}*/}
                        {movie.backdropPath && (
                            <Box
                                component="img"
                                alt={movie.title}
                                src={movie?.backdropPath}
                            />
                        )}
                    </>
                )}
                <Typography variant="h5">Tagline: {movie.tagline}</Typography>

                <Button variant="contained" onClick={() => window.open(movie?.imdb, '_blank')}>
                    IMDb
                </Button>
                <Typography variant="body1">
                    Genres:{' '}
                    {movie.genres && movie.genres.length > 0 ? (
                        movie.genres.map((genre) => (
                            <Chip
                                key={genre.id}
                                label={genre.name}
                                clickable
                                variant="outlined"
                                avatar={<Avatar>{genre.name.substring(0, 1)}</Avatar>}
                                onClick={() => navigate(`/genres/${genre.id}`)}
                            />
                        ))
                    ) : (
                        'No genres found'
                    )}
                </Typography>
                <Typography variant="body1">Release Date: {movie.releaseDate}</Typography>
                <Typography variant="body1">{movie.overview}</Typography>
                {movie.homepage && (
                    <Button variant="contained" onClick={() => window.open(movie.homepage, '_blank')}>
                        HomePage
                    </Button>
                )}
                <Typography variant="body1">Budget: {movie.budget}</Typography>
                <Typography variant="body1">Runtime: {movie.runtime}</Typography>
                <Divider/>

                {movie.cast && (
                    <div className="cast">
                        <Typography variant="h3">Cast</Typography>
                        <CastComponent cast={movie.cast}/>
                    </div>
                )}
                {movie.crew && (
                    <>
                        <Typography variant="h3">Crew</Typography>
                        <CrewComponent crew={movie.crew}/>
                    </>
                )}

                {/* Movie review statistics */}
                <MovieReviewStatistics movieID={parseInt(movieID!)}/>

                {/* Conditional rendering based on user role */}
                {userRole === 'USER' && (
                    <>
                        {/* Add/Remove from watchlist */}
                        {isInMyWatchlist ? (
                            <Button onClick={removeFromWatchlist}>Remove from Watchlist</Button>
                        ) : (
                            <Button onClick={addToWatchlist}>Add to Watchlist</Button>
                        )}
                    </>
                )}

                {userRole === 'CRITIC' && (
                    <>
                        {!isReviewed ? (
                            // Add review
                            <>
                                <Button onClick={handleClickOpenAndFetchReview}>Add Review</Button>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Add Review</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="content"
                                            label="Content"
                                            type="text"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={review.content}
                                            onChange={(e) => setReview({...review, content: e.target.value})}
                                        />
                                        <Rating
                                            name="rating"
                                            defaultValue={review.rating}
                                            precision={1}
                                            max={10}
                                            onChange={(event, newValue) =>
                                                setReview({...review, rating: newValue == null ? 0 : newValue})
                                            }
                                        />

                                    </DialogContent>
                                    <DialogActions>
                                        <Button color="error" onClick={handleClose}>Cancel</Button>
                                        <Button onClick={handlePostReview}>Submit</Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                        ) : (
                            // Update review
                            <>
                                <Button onClick={handleClickOpenAndFetchReview}>Update Review</Button>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Update Review</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="updateReviewContent"
                                            label="Content"
                                            type="text"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            defaultValue={review?.content}
                                            value={updateReviewContent}
                                            onChange={(e) => setUpdateReviewContent(e.target.value)}
                                        />
                                        <Rating
                                            name="updateReviewRating"
                                            defaultValue={review.rating}
                                            precision={1}
                                            max={10}
                                            onChange={(event, newValue) =>
                                                setUpdateReviewRating(newValue == null ? 0 : newValue)
                                            }
                                        />

                                    </DialogContent>
                                    <DialogActions>
                                        <Button color="error" onClick={handleClose}>Cancel</Button>
                                        <Button onClick={handleUpdateReview}>Update</Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                        )}
                    </>
                )}

                {/* Conditional rendering based on user role */}
                {userRole === 'ADMIN' && (
                    <>
                        {/* Update movie details */}
                        <Button onClick={handleClickOpen}>Update Movie</Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Update Movie</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="updateOverview"
                                    label="Overview"
                                    type="text"
                                    fullWidth
                                    multiline
                                    rows={6}
                                    defaultValue={movie.overview}
                                />
                                <TextField
                                    margin="dense"
                                    id="updateBudget"
                                    label="Budget"
                                    type="number"
                                    defaultValue={movie.budget}
                                />
                                <TextField
                                    margin="dense"
                                    id="updateRuntime"
                                    label="Runtime"
                                    type="number"
                                    defaultValue={movie.runtime}
                                />
                                <TextField
                                    margin="dense"
                                    id="updateTagline"
                                    label="Tagline"
                                    type="text"
                                    multiline
                                    defaultValue={movie.tagline}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button color="error" onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleConfirmUpdateMovie}>Update</Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )}
                <Snackbar
                    open={error !== ''}
                    autoHideDuration={2500}
                    onClose={handleCloseError}
                >
                    <Alert onClose={handleCloseError} severity="error" sx={{width: '100%', maxWidth: '500px'}}>
                        {error}
                    </Alert>
                </Snackbar>
            </div>
        </>
    );
}

export default MovieDetailsComponent;

import React from 'react';
import {ReviewDTO} from "../../domain/ReviewDTO";
import {useNavigate} from "react-router";
import MovieCardComponent from "../movies/MovieCardComponent";
import "./Review.css";
import {Rating} from "@mui/material";

interface ReviewComponentProps {
    review: ReviewDTO;
    showAuthor: boolean;
    showMovie: boolean;
}

const ReviewComponent = ({review, showAuthor, showMovie}: ReviewComponentProps) => {
    const navigate = useNavigate();


    return (
        <div className="review-container" style={{ width: '500px' }}>
            <div className="review-content">{review.content}</div>
            <div className="review-rating">
                Rating:{' '}
                <Rating
                    name="review-rating"
                    value={review.rating}
                    readOnly
                    precision={1}
                    max={10}
                    size="small"
                />
            </div>
            <div className="review-date">Reviewed on: {review.date}</div>
            {showAuthor && (
                <div
                    className="review-author"
                    onClick={() => navigate(`/users/${review.author.id}`)}
                >
                    Author: {review.author.firstname} {review.author.lastname}
                </div>
            )}
            {showMovie && (
                <div className="review-movie">
                    <MovieCardComponent movie={review.movie}/>
                </div>
            )}
        </div>
    );
};

export default ReviewComponent;

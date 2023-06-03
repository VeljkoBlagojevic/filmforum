import React, {useEffect, useState} from 'react';
import {ReviewDTO} from "../../domain/ReviewDTO";
import axios from "axios";
import ReviewComponent from "./ReviewComponent";
import BarChart from "./BarChart";
import "./MovieReviewStatistics.css"

interface MovieReviewStatisticsProps {
    movieID: number;
}

const MovieReviewStatistics = ({movieID}: MovieReviewStatisticsProps) => {

    const [reviews, setReviews] = useState<ReviewDTO[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/reviews/movie/${movieID}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setReviews(response.data.content);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="movies-reviews-container">
            <div className="movie-reviews-info">
                <h2>Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map((review) => <ReviewComponent review={review} showMovie={false} showAuthor={true} key={review.id}/>)
                ) : (<h4>No reviews available yet. Check back later for updates!</h4>
                )}
            </div>
            <BarChart movieID={movieID}/>
        </div>
    );
};

export default MovieReviewStatistics;
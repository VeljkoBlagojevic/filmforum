package rs.ac.bg.fon.filmforum_backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.filmforum_backend.domain.Review;
import rs.ac.bg.fon.filmforum_backend.dto.ReviewDTO;
import rs.ac.bg.fon.filmforum_backend.dto.mapper.ReviewMapper;
import rs.ac.bg.fon.filmforum_backend.service.ReviewService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;

    @GetMapping
    public Page<ReviewDTO> getAllReviews(Pageable pageable) {
        return reviewService.getAllReviews(pageable).map(reviewMapper::mapToDTO);
    }

    @GetMapping("/{id}")
    public ReviewDTO getReviewById(@PathVariable Long id) {
        return reviewMapper.mapToDTO(reviewService.getReviewById(id));
    }

    @GetMapping("/movie/{movieId}")
    public Page<ReviewDTO> getReviewsByMovieId(@PathVariable Long movieId, Pageable pageable) {
        return reviewService.getReviewsByMovieId(movieId, pageable).map(reviewMapper::mapToDTO);
    }

    @GetMapping("/user/{userId}")
    public Page<ReviewDTO> getReviewsByUserId(@PathVariable Long userId, Pageable pageable) {
        return reviewService.getReviewsByUserId(userId, pageable).map(reviewMapper::mapToDTO);
    }

    @PostMapping
    public ReviewDTO createReview(@RequestBody @Valid ReviewDTO review) {
        return reviewMapper.mapToDTO(reviewService.createReview(reviewMapper.mapFromDTO(review)));
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
    }


    @PutMapping
    public ReviewDTO updateReview(@RequestBody @Valid ReviewDTO reviewDTO) {
        Review review = reviewMapper.mapFromDTO(reviewDTO);
        return reviewMapper.mapToDTO(reviewService.updateReview(review.getId(), review));
    }

    @PutMapping("/{id}")
    public ReviewDTO updateReview(@PathVariable Long id, @RequestBody @Valid ReviewDTO reviewDTO) {
        Review review = reviewMapper.mapFromDTO(reviewDTO);
        return reviewMapper.mapToDTO(reviewService.updateReview(id, review));
    }

    @GetMapping("/movie/{movieId}/isReviewed")
    public long isReviewed(@PathVariable Long movieId) {
        return reviewService.isReviewed(movieId);
    }
}

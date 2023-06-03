package rs.ac.bg.fon.filmforum_backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.filmforum_backend.domain.Movie;
import rs.ac.bg.fon.filmforum_backend.domain.Review;
import rs.ac.bg.fon.filmforum_backend.repository.MovieRepository;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Transactional
public class MovieService {

    private final MovieRepository movieRepository;
    private final ReviewService reviewService;

    public Page<Movie> getAll(Pageable pageable) {
        return movieRepository.findAll(pageable);
    }

    public Movie getById(Long id) {
        return movieRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Map<Integer, Long> getStatistics(Long movieId) {
        List<Review> reviewsForMovie = reviewService.getReviewsByMovieId(movieId);
        Map<Integer, Long> statistics = reviewsForMovie.stream()
                .collect(Collectors.groupingBy(Review::getRating, Collectors.counting()));
        IntStream.range(1, 11).forEach(i -> statistics.putIfAbsent(i, 0L));
        return statistics;
    }

    public Movie updateMovie(Movie movie) {
        Movie movieFromDatabase = movieRepository.findById(movie.getId()).orElseThrow(NoSuchElementException::new);
        movieFromDatabase.setBudget(movie.getBudget());
        movieFromDatabase.setOverview(movie.getOverview());
        movieFromDatabase.setTagline(movie.getTagline());
        movieFromDatabase.setRuntime(movie.getRuntime());
        return movieRepository.save(movieFromDatabase);
    }
}

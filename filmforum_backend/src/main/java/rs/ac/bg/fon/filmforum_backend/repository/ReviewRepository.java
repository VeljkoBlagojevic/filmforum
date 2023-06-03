package rs.ac.bg.fon.filmforum_backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.filmforum_backend.domain.Review;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByAuthorId(Long id, Pageable pageable);
    Page<Review> findByMovieId(long id, Pageable pageable);
    List<Review> findByMovieId(long id);

    Optional<Review> findByAuthorIdAndMovieId(Long id, Long movieId);
}

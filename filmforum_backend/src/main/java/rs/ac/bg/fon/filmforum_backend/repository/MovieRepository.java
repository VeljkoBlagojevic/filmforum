package rs.ac.bg.fon.filmforum_backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.filmforum_backend.domain.Genre;
import rs.ac.bg.fon.filmforum_backend.domain.Movie;

import java.util.Collection;


@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    Page<Movie> findByTitleContainsIgnoreCase(String title, Pageable pageable);
    Page<Movie> findByGenresIn(Collection<Genre> genres, Pageable pageable);
}

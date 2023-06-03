package rs.ac.bg.fon.filmforum_backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.filmforum_backend.domain.Genre;
import rs.ac.bg.fon.filmforum_backend.domain.Movie;
import rs.ac.bg.fon.filmforum_backend.repository.GenreRepository;
import rs.ac.bg.fon.filmforum_backend.repository.MovieRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class GenreService {

    private final GenreRepository genreRepository;
    private final MovieRepository movieRepository;

    public Page<Genre> getAll(Pageable pageable) {
        return genreRepository.findAll(pageable);
    }

    public Genre getById(Long id) {
        return genreRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Page<Movie> getGenreMovies(Long id, Pageable pageable) {
        Genre genre = getById(id);
        return movieRepository.findByGenresIn(List.of(genre), pageable);
    }
}

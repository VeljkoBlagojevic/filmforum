package rs.ac.bg.fon.filmforum_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.filmforum_backend.domain.Genre;
import rs.ac.bg.fon.filmforum_backend.dto.MovieDTO;
import rs.ac.bg.fon.filmforum_backend.dto.mapper.MovieMapper;
import rs.ac.bg.fon.filmforum_backend.service.GenreService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/genres")
@RequiredArgsConstructor
public class GenreController {

    private final GenreService genreService;
    private final MovieMapper movieMapper;

    @GetMapping
    public Page<Genre> getGenres(Pageable pageable) {
        return genreService.getAll(pageable);
    }

    @GetMapping("/{id}")
    public Genre getGenreById(@PathVariable Long id) {
        return genreService.getById(id);
    }

    @GetMapping("/{id}/movies")
    public Page<MovieDTO> getGenreMovies(@PathVariable Long id, Pageable pageable) {
        return genreService.getGenreMovies(id, pageable).map(movieMapper::mapToDTO);
    }

}

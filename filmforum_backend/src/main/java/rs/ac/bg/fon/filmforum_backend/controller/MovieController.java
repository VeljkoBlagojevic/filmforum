package rs.ac.bg.fon.filmforum_backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.filmforum_backend.dto.MovieDTO;
import rs.ac.bg.fon.filmforum_backend.dto.mapper.MovieMapper;
import rs.ac.bg.fon.filmforum_backend.service.MovieService;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;
    private final MovieMapper movieMapper;

    @GetMapping
    public Page<MovieDTO> getMovies(@RequestParam(required = false) String title, Pageable pageable) {
        return movieService.getByTitle(title, pageable).map(movieMapper::mapToDTO);
    }

    @GetMapping("/{id}")
    public MovieDTO getMovieById(@PathVariable Long id) {
        return movieMapper.mapToDTO(movieService.getById(id));
    }

    @GetMapping("/{movieId}/statistics")
    public Map<Integer, Long> getStatistics(@PathVariable Long movieId) {
        return movieService.getStatistics(movieId);
    }

    @PutMapping
    public MovieDTO updateMovie(@RequestBody @Valid MovieDTO movie) {
        return movieMapper.mapToDTO(movieService.updateMovie(movieMapper.mapFromDTO(movie)));
    }
}
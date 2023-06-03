package rs.ac.bg.fon.filmforum_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.filmforum_backend.dto.WatchListDTO;
import rs.ac.bg.fon.filmforum_backend.dto.mapper.WatchListMapper;
import rs.ac.bg.fon.filmforum_backend.service.WatchListService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/watchlist")
@RequiredArgsConstructor
public class WatchlistController {

    private final WatchListService watchListService;
    private final WatchListMapper watchListMapper;

    @GetMapping("/{id}")
    public WatchListDTO getWatchlistById(@PathVariable Long id) {
        return watchListMapper.mapToDTO(watchListService.getWatchlistById(id));
    }

    @GetMapping
    public WatchListDTO getWatchlist() {
        return watchListMapper.mapToDTO(watchListService.getWatchlist());
    }

    @GetMapping("/user/{userId}")
    public WatchListDTO getWatchlistByUser(@PathVariable Long userId) {
        return watchListMapper.mapToDTO(watchListService.getWatchlistByUser(userId));
    }

    @PostMapping("/movies/{movieId}")
    public WatchListDTO addMovieToMyWatchlist(@PathVariable Long movieId) {
        return watchListMapper.mapToDTO(watchListService.addMovieToMyWatchlist(movieId));
    }

    @DeleteMapping("/movies/{movieId}")
    public void removeMovieFromMyWatchlist(@PathVariable Long movieId) {
        watchListService.removeMovieFromMyWatchlist(movieId);
    }

    @GetMapping("/movies/{movieId}")
    public boolean isInMyWatchlist(@PathVariable Long movieId) {
        return watchListService.isInMyWatchlist(movieId);
    }
}

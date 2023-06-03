package rs.ac.bg.fon.filmforum_backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.filmforum_backend.domain.Movie;
import rs.ac.bg.fon.filmforum_backend.domain.User;
import rs.ac.bg.fon.filmforum_backend.domain.WatchList;
import rs.ac.bg.fon.filmforum_backend.repository.WatchListRepository;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class WatchListService {

    private final WatchListRepository watchListRepository;
    private final UserService userService;
    private final MovieService movieService;

    public WatchList addMovieToMyWatchlist(Long movieId) {
        User currentUser = userService.getCurrentlyLoggedInUser();
        Movie movieToBeAddedToWatchList = movieService.getById(movieId);
        WatchList watchList = watchListRepository.findByUserId(currentUser.getId())
                .orElseGet(() -> {
                    WatchList newWatchList = new WatchList();
                    newWatchList.setUser(currentUser);
                    return newWatchList;
                });
        watchList.addMovie(movieToBeAddedToWatchList);
        return watchListRepository.save(watchList);
    }

    public WatchList getWatchlistById(Long id) {
        return watchListRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public WatchList getWatchlist() {
        User currentUser = userService.getCurrentlyLoggedInUser();
        return watchListRepository.findByUserId(currentUser.getId()).orElseThrow(NoSuchElementException::new);
    }

    public WatchList getWatchlistByUser(Long userId) {
        return watchListRepository.findByUserId(userId).orElseThrow(NoSuchElementException::new);
    }

    public void removeMovieFromMyWatchlist(Long movieId) {
        User currentlyLoggedInUser = userService.getCurrentlyLoggedInUser();
        Movie movieToBeRemovedFromWatchList = movieService.getById(movieId);
        WatchList watchList = watchListRepository
                .findByUserId(currentlyLoggedInUser.getId())
                .orElseThrow(NoSuchElementException::new);
        watchList.removeMovie(movieToBeRemovedFromWatchList);
        watchListRepository.save(watchList);
    }

    public boolean isInMyWatchlist(Long movieId) {
        Movie movie = movieService.getById(movieId);
        User currentUser = userService.getCurrentlyLoggedInUser();
        WatchList watchList = watchListRepository.findByUserId(currentUser.getId()).orElseThrow(NoSuchElementException::new);
        return watchList.getMovies().contains(movie);
    }
}

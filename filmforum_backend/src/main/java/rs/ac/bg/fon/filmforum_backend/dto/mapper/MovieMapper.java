package rs.ac.bg.fon.filmforum_backend.dto.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import rs.ac.bg.fon.filmforum_backend.domain.Movie;
import rs.ac.bg.fon.filmforum_backend.dto.MovieDTO;

@Component
@RequiredArgsConstructor
public class MovieMapper implements DTOMapper<Movie, MovieDTO> {
    private final ActorMapper actorMapper;
    private final CrewMemberMapper crewMapper;

    @Override
    public Movie mapFromDTO(MovieDTO movieDTO) {
        String posterPath = movieDTO.posterPath().substring(movieDTO.posterPath().lastIndexOf('/') + 1);
        String backdropPath = movieDTO.backdropPath().substring(movieDTO.backdropPath().lastIndexOf('/') + 1);
        return Movie.builder()
                .id(movieDTO.id())
                .adult(movieDTO.adult())
                .backdropPath(backdropPath)
                .budget(movieDTO.budget())
                .genres(movieDTO.genres())
                .homepage(movieDTO.homepage())
                .imdbId(movieDTO.imdb())
                .originalLanguage(movieDTO.originalLanguage())
                .originalTitle(movieDTO.originalTitle())
                .overview(movieDTO.overview())
                .popularity(movieDTO.popularity())
                .posterPath(posterPath)
                .releaseDate(movieDTO.releaseDate())
                .revenue(movieDTO.revenue())
                .runtime(movieDTO.runtime())
                .status(movieDTO.status())
                .tagline(movieDTO.tagline())
                .tagline(movieDTO.tagline())
                .video(movieDTO.video())
                .cast(actorMapper.mapFromDTO(movieDTO.cast()))
                .crew(crewMapper.mapFromDTO(movieDTO.crew()))
                .build();
    }

    @Override
    public MovieDTO mapToDTO(Movie entity) {
        return new MovieDTO(
                entity.getId(),
                entity.isAdult(),
                "https://image.tmdb.org/t/p/w1280" + entity.getBackdropPath(),
                entity.getBudget(),
                entity.getGenres(),
                entity.getHomepage(),
                "https://www.imdb.com/title/" + entity.getImdbId(),
                entity.getOriginalLanguage(),
                entity.getOriginalTitle(),
                entity.getOverview(),
                entity.getPopularity(),
                "https://image.tmdb.org/t/p/w1280" + entity.getPosterPath(),
                entity.getReleaseDate(),
                entity.getRevenue(),
                entity.getRuntime(),
                entity.getStatus(),
                entity.getTagline(),
                entity.getTitle(),
                entity.isVideo(),
                actorMapper.mapToDTO(entity.getCast()),
                crewMapper.mapToDTO(entity.getCrew())
        );
    }
}

package rs.ac.bg.fon.filmforum_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import rs.ac.bg.fon.filmforum_backend.domain.Genre;

import java.util.List;

public record MovieDTO(
        long id,
        boolean adult,
        String backdropPath,
        @PositiveOrZero(message = "Movie budget cannot be a negative number")
        long budget,
        List<Genre> genres,
        String homepage,
        String imdb,
        String originalLanguage,
        String originalTitle,
        @NotBlank(message = "Movie overview cannot be blank")
        String overview,
        double popularity,
        String posterPath,
        String releaseDate,
        long revenue,
        @PositiveOrZero(message = "Movie runtime cannot be a negative number")
        int runtime,
        String status,
        @NotBlank(message = "Movie tagline cannot be blank")
        String tagline,
        String title,
        boolean video,
        List<ActorDTO> cast,
        List<CrewMemberDTO> crew
) {
}
package rs.ac.bg.fon.filmforum_backend.dto;

import rs.ac.bg.fon.filmforum_backend.domain.Gender;

public record PersonDTO(
        long id,
        String name,
        String biography,
        String birthday,
        Gender gender,
        String imdb,
        String placeOfBirth,
        String profilePath) {
}

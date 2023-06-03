package rs.ac.bg.fon.filmforum_backend.dto;

public record ActorDTO(
        String creditId,
        String name,
        String profilePath,
        String character,
        PersonDTO person) {
}

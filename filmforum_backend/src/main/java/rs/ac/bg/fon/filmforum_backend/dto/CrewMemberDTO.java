package rs.ac.bg.fon.filmforum_backend.dto;

import rs.ac.bg.fon.filmforum_backend.domain.Gender;

public record CrewMemberDTO(
        String creditId,
        Gender gender,
        String name,
        String profilePath,
        String department,
        String job,
        PersonDTO person
) {
}

package rs.ac.bg.fon.filmforum_backend.dto;

import rs.ac.bg.fon.filmforum_backend.domain.Role;

public record UserDTO(
        Long id,
        String firstname,
        String lastname,
        String email,
        String username,
        Role role,
        String profilePictureUri
) {
}

package rs.ac.bg.fon.filmforum_backend.dto;

import java.util.List;

public record WatchListDTO(
        long id,
        UserDTO user,
        List<MovieDTO> movies
) {
}

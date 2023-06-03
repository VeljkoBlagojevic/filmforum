package rs.ac.bg.fon.filmforum_backend.seeder;

import lombok.*;
import rs.ac.bg.fon.filmforum_backend.domain.Genre;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
class Genres {
    private List<Genre> genres;
}

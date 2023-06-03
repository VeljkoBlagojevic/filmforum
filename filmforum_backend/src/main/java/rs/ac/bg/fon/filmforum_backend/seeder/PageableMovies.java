package rs.ac.bg.fon.filmforum_backend.seeder;

import lombok.*;
import rs.ac.bg.fon.filmforum_backend.domain.Movie;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
class PageableMovies {
    private Pageable<Movie> pageableMovies;
}

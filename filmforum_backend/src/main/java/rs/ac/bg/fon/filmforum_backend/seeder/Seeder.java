package rs.ac.bg.fon.filmforum_backend.seeder;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/seed")
@RequiredArgsConstructor
public class Seeder {

    static final String API_KEY = "49844a98b9fefb94d4a075c1432d1f99";


//    private static final List<Long> popularMoviesIDs = List.of(238L, 278L, 240L, 424L, 389L, 155L, 497L, 680L, 429L, 13L, 122L, 769L, 76600L, 493529L, 603692L, 804150L, 934433L, 274L, 901L, 101L, 207L, 105L, 361743L, 315162L, 10494L, 28L, 299534L, 299536L, 8587L, 1585L, 490132L, 354912L, 37257L, 284L, 555604L);


    private final GenreSeeder genreSeeder;
    private final MovieSeeder movieSeeder;
    private final UserSeeder userSeeder;

    @GetMapping
    public String seed() {
        genreSeeder.seedGenres();
        movieSeeder.seedMovies();
        userSeeder.seedAdmin();
        return "Successfully seeded database";
    }




}

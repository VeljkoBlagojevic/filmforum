package rs.ac.bg.fon.filmforum_backend.seeder;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import rs.ac.bg.fon.filmforum_backend.repository.GenreRepository;

import java.util.HashMap;
import java.util.Map;

import static rs.ac.bg.fon.filmforum_backend.seeder.Seeder.API_KEY;

@Component
@RequiredArgsConstructor
public class GenreSeeder {

    private static final String URL_GENRES = "https://api.themoviedb.org/3/genre/movie/list?api_key={API_KEY}";
    private final RestTemplate restTemplate;
    private final GenreRepository genreRepository;

    public void seedGenres() {
        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("API_KEY", API_KEY);
        ResponseEntity<Genres> genresResponse = restTemplate.getForEntity(URL_GENRES, Genres.class, uriVariables);
        genreRepository.saveAll(genresResponse.getBody().getGenres());
    }

}

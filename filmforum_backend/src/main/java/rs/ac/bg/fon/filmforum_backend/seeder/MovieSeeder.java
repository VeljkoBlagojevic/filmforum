package rs.ac.bg.fon.filmforum_backend.seeder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import rs.ac.bg.fon.filmforum_backend.domain.Actor;
import rs.ac.bg.fon.filmforum_backend.domain.CrewMember;
import rs.ac.bg.fon.filmforum_backend.domain.Movie;
import rs.ac.bg.fon.filmforum_backend.domain.Person;
import rs.ac.bg.fon.filmforum_backend.repository.MovieRepository;
import rs.ac.bg.fon.filmforum_backend.repository.PersonRepository;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

import static rs.ac.bg.fon.filmforum_backend.seeder.Seeder.API_KEY;

@Component
@RequiredArgsConstructor
public class MovieSeeder {

    private static final String URL_TOP_RATED_MOVIES = "https://api.themoviedb.org/3/movie/top_rated?api_key={API_KEY}&page={pageNumber}";
    private static final String URL_CREDITS = "https://api.themoviedb.org/3/movie/{movieID}/credits?api_key={API_KEY}";
    private static final String URL_MOVIE = "https://api.themoviedb.org/3/movie/{movieID}?api_key={API_KEY}";
    private static final String URL_PERSON = "https://api.themoviedb.org/3/person/{personID}}?api_key={API_KEY}";

    private final RestTemplate restTemplate;
    private final MovieRepository movieRepository;
    private final ObjectMapper objectMapper;
    private final PersonRepository personRepository;

    public void seedMovies() {
        IntStream.range(1, 10).forEach(this::processMoviePage);
    }

    private void processMoviePage(int pageNumber) {
        Map<String, String> uriVariables = createUriVariables("pageNumber", String.valueOf(pageNumber));
        String topRatedMoviesResponse = restTemplate.getForObject(URL_TOP_RATED_MOVIES, String.class, uriVariables);

        try {
            Pageable<Response> pageableResponse = parsePageableResponse(topRatedMoviesResponse);
            pageableResponse.getResults().forEach(this::processMovie);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse top rated movies response", e);
        }
    }

    private Map<String, String> createUriVariables(String uriVariableName, String uriVariableValue) {
        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("API_KEY", API_KEY);
        uriVariables.put(uriVariableName, String.valueOf(uriVariableValue));
        return uriVariables;
    }

    private Pageable<Response> parsePageableResponse(String topRatedMoviesResponse) throws JsonProcessingException {
        TypeReference<Pageable<Response>> typeReference = new TypeReference<>() {};
        return objectMapper.readValue(topRatedMoviesResponse, typeReference);
    }

    private void processMovie(Response topRatedMovieResponse) {
        Map<String, String> uriVariables = createUriVariables("movieID", String.valueOf(topRatedMovieResponse.getId()));
        ResponseEntity<Movie> movieResponseEntity = restTemplate.getForEntity(URL_MOVIE, Movie.class, uriVariables);

        if (movieResponseEntity.getStatusCode().is2xxSuccessful()) {
            Movie movie = movieResponseEntity.getBody();
            Credits credits = restTemplate.getForObject(URL_CREDITS, Credits.class, uriVariables);

            List<Actor> cast = getSortedLimitedCast(credits.getCast());
            cast.forEach(this::processActor);

            List<CrewMember> crew = getLimitedCrew(credits.getCrew());
            crew.forEach(this::processCrewMember);

            movie.setCast(cast);
            movie.setCrew(crew);
            movieRepository.save(movie);
        }
    }

    private List<Actor> getSortedLimitedCast(List<Actor> cast) {
        return cast.stream()
                .sorted(Comparator.comparing(Actor::getOrderNumber))
                .limit(5)
                .toList();
    }

    private void processActor(Actor actor) {
        Person person = getPerson(actor.getId());
        actor.setPerson(person);
        personRepository.save(person);
    }

    private List<CrewMember> getLimitedCrew(List<CrewMember> crew) {
        return crew.subList(0, Math.min(crew.size(), 5));
    }

    private void processCrewMember(CrewMember crewMember) {
        Person person = getPerson(crewMember.getId());
        crewMember.setPerson(person);
        personRepository.save(person);
    }

    private Person getPerson(long personId) {
        Map<String, String> uriVariablesPerson = createUriVariables("personID", String.valueOf(personId));
        return restTemplate.getForObject(URL_PERSON, Person.class, uriVariablesPerson);
    }


}

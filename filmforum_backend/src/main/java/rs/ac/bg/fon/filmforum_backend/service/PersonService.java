package rs.ac.bg.fon.filmforum_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.filmforum_backend.domain.Movie;
import rs.ac.bg.fon.filmforum_backend.domain.Person;
import rs.ac.bg.fon.filmforum_backend.repository.PersonRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class PersonService {

    private final PersonRepository personRepository;
    private final MovieService movieService;

    public Page<Person> getAll(Pageable pageable) {
        return personRepository.findAll(pageable);
    }

    public Page<Person> getByName(String name, Pageable pageable) {
        if(name == null) {
            return getAll(pageable);
        } else {
            return personRepository.findByNameContainsIgnoreCase(name, pageable);
        }
    }

    public Person getById(Long id) {
        return personRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Page<Movie> getMoviesByPersonId(Long id, Pageable pageable) {
        Person person = getById(id);
        List<Movie> movieList = movieService.getAll(Pageable.unpaged())
                .stream()
                .filter(movie ->
                        movie.getCast().stream().anyMatch(actor -> actor.getId() == person.getId())
                                ||
                                movie.getCrew().stream().anyMatch(crewMember -> crewMember.getId() == person.getId())
                )
                .toList();
        return new PageImpl<>(movieList, pageable, movieList.size());
    }
}

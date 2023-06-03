package rs.ac.bg.fon.filmforum_backend.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.filmforum_backend.dto.MovieDTO;
import rs.ac.bg.fon.filmforum_backend.dto.PersonDTO;
import rs.ac.bg.fon.filmforum_backend.dto.mapper.MovieMapper;
import rs.ac.bg.fon.filmforum_backend.dto.mapper.PersonMapper;
import rs.ac.bg.fon.filmforum_backend.service.PersonService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/people")
@RequiredArgsConstructor
public class PersonController {

    private final PersonService personService;
    private final PersonMapper personMapper;
    private final MovieMapper movieMapper;

    @GetMapping
    public Page<PersonDTO> getAll(Pageable pageable) {
        return personService.getAll(pageable).map(personMapper::mapToDTO);
    }

    @GetMapping("/{id}")
    public PersonDTO getPerson(@PathVariable Long id) {
        return personMapper.mapToDTO(personService.getById(id));
    }

    @GetMapping("/{id}/movies")
    public Page<MovieDTO> getMoviesByActor(@PathVariable Long id, Pageable pageable) {
        return personService.getMoviesByPersonId(id, pageable).map(movieMapper::mapToDTO);
    }
}

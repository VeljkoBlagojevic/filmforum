package rs.ac.bg.fon.filmforum_backend.dto.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import rs.ac.bg.fon.filmforum_backend.domain.Person;
import rs.ac.bg.fon.filmforum_backend.dto.PersonDTO;

@Component
@RequiredArgsConstructor
public class PersonMapper implements DTOMapper<Person, PersonDTO> {

    private final GenderMapper genderMapper;

    @Override
    public Person mapFromDTO(PersonDTO personDTO) {
        String profilePath = personDTO.profilePath().substring(personDTO.profilePath().lastIndexOf('/') + 1);
        return Person.builder()
                .id(personDTO.id())
                .name(personDTO.name())
                .biography(personDTO.biography())
                .birthday(personDTO.birthday())
                .gender(genderMapper.mapFromDTO(personDTO.gender()))
                .imdbId(personDTO.imdb())
                .placeOfBirth(personDTO.placeOfBirth())
                .profilePath(profilePath)
                .build();
    }

    @Override
    public PersonDTO mapToDTO(Person entity) {
        return new PersonDTO(
                entity.getId(),
                entity.getName(),
                entity.getBiography(),
                entity.getBirthday(),
                genderMapper.mapToDTO(entity.getGender()),
                "https://www.imdb.com/name/" + entity.getImdbId(),
                entity.getPlaceOfBirth(),
                "https://image.tmdb.org/t/p/w1280" + entity.getProfilePath()
        );
    }
}

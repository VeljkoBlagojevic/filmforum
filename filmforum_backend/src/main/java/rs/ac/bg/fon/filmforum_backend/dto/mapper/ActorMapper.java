package rs.ac.bg.fon.filmforum_backend.dto.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import rs.ac.bg.fon.filmforum_backend.domain.Actor;
import rs.ac.bg.fon.filmforum_backend.dto.ActorDTO;
import rs.ac.bg.fon.filmforum_backend.service.PersonService;

@Component
@RequiredArgsConstructor
public class ActorMapper implements DTOMapper<Actor, ActorDTO> {
    private final PersonService personService;
    private final PersonMapper personMapper;

    @Override
    public Actor mapFromDTO(ActorDTO actorDTO) {
        String profilePath = actorDTO.profilePath().substring(actorDTO.profilePath().lastIndexOf('/') + 1);
        return Actor.builder()
                .creditId(actorDTO.creditId())
                .name(actorDTO.name())
                .profilePath(profilePath)
                .characterName(actorDTO.character())
                .person(personService.getById(actorDTO.person().id()))
                .build();
    }

    @Override
    public ActorDTO mapToDTO(Actor entity) {
        return new ActorDTO(
                entity.getCreditId(),
                entity.getName(),
                "https://image.tmdb.org/t/p/w1280" + entity.getProfilePath(),
                entity.getCharacterName(),
                personMapper.mapToDTO(entity.getPerson())
        );
    }
}

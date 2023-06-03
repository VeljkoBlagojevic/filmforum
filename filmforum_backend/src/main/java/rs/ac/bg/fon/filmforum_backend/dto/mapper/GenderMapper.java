package rs.ac.bg.fon.filmforum_backend.dto.mapper;

import org.springframework.stereotype.Component;
import rs.ac.bg.fon.filmforum_backend.domain.Gender;

@Component
public class GenderMapper implements DTOMapper<Integer, Gender> {
    @Override
    public Integer mapFromDTO(Gender gender) {
        return switch (gender) {
            case FEMALE -> 1;
            case MALE -> 2;
            default -> 3;
        };
    }

    @Override
    public Gender mapToDTO(Integer entity) {
        return switch (entity) {
            case 1 -> Gender.FEMALE;
            case 2 -> Gender.MALE;
            default -> Gender.OTHER;
        };
    }
}

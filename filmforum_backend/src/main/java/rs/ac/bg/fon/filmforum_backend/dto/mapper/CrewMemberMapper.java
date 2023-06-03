package rs.ac.bg.fon.filmforum_backend.dto.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import rs.ac.bg.fon.filmforum_backend.domain.CrewMember;
import rs.ac.bg.fon.filmforum_backend.dto.CrewMemberDTO;

@Component
@RequiredArgsConstructor
public class CrewMemberMapper implements DTOMapper<CrewMember, CrewMemberDTO> {
    private final PersonMapper personMapper;
    private final GenderMapper genderMapper;

    @Override
    public CrewMember mapFromDTO(CrewMemberDTO crewMemberDTO) {
        String profilePath = crewMemberDTO.profilePath().substring(crewMemberDTO.profilePath().lastIndexOf('/') + 1);
        return CrewMember.builder()
                .creditId(crewMemberDTO.creditId())
                .id(crewMemberDTO.person().id())
                .gender(genderMapper.mapFromDTO(crewMemberDTO.gender()))
                .name(crewMemberDTO.name())
                .profilePath(profilePath)
                .department(crewMemberDTO.department())
                .job(crewMemberDTO.job())
                .person(personMapper.mapFromDTO(crewMemberDTO.person()))
                .build();
    }

    @Override
    public CrewMemberDTO mapToDTO(CrewMember entity) {
        return new CrewMemberDTO(
                entity.getCreditId(),
                genderMapper.mapToDTO(entity.getGender()),
                entity.getName(),
                "https://image.tmdb.org/t/p/w1280" + entity.getProfilePath(),
                entity.getDepartment(),
                entity.getJob(),
                personMapper.mapToDTO(entity.getPerson())
        );
    }
}

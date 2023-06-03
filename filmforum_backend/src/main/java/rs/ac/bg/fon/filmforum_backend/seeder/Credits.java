package rs.ac.bg.fon.filmforum_backend.seeder;

import lombok.*;
import rs.ac.bg.fon.filmforum_backend.domain.Actor;
import rs.ac.bg.fon.filmforum_backend.domain.CrewMember;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
class Credits {
    private long id;
    private List<Actor> cast;
    private List<CrewMember> crew;
}

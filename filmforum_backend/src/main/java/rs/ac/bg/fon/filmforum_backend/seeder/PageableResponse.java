package rs.ac.bg.fon.filmforum_backend.seeder;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
class PageableResponse {
    private Pageable<Response> response;
}

package rs.ac.bg.fon.filmforum_backend.seeder;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
class Pageable<T> {
    private long page;
    @JsonProperty("total_pages")
    private long totalPages;
    @JsonProperty("total_results")
    private long totalResults;
    private List<T> results;
}

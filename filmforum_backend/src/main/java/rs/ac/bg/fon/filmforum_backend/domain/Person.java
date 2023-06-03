package rs.ac.bg.fon.filmforum_backend.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
@Entity

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Person {
    @Id
    private long id;
    private boolean adult;

    @Column(length = 8191)
    private String biography;
    private String birthday;
    private int gender;
    private String homepage;

    @JsonProperty("imdb_id")
    private String imdbId;

    @JsonProperty("known_for_department")
    private String knownForDepartment;

    private String name;

    @JsonProperty("place_of_birth")
    private String placeOfBirth;

    private double popularity;

    @JsonProperty("profile_path")
    private String profilePath;
}

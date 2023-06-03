package rs.ac.bg.fon.filmforum_backend.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;


@Entity

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class CrewMember {
    @Id
    @JsonProperty("credit_id")
    private String creditId;

    private long id;

    private boolean adult;

    private int gender;

    @JsonProperty("known_for_department")
    private String knownForDepartment;

    private String name;
    @JsonProperty("original_name")
    private String originalName;

    private double popularity;

    @JsonProperty("profile_path")
    private String profilePath;

    private String department;

    private String job;

    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person person;

}


package rs.ac.bg.fon.filmforum_backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record ReviewDTO(
        long id,
        @NotBlank(message = "Review content can't be blank")
        String content,
        UserDTO author,
        LocalDate date,
        MovieDTO movie,
        @Min(value = 1, message = "Rating can't be less than 1")
        @Max(value = 10, message = "Rating can't be more than 10'")
        int rating

) {
}

package rs.ac.bg.fon.filmforum_backend.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import rs.ac.bg.fon.filmforum_backend.domain.Role;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class RegisterRequest {
  @NotBlank(message = "Your firstname cannot be blank")
  private String firstname;
  @NotBlank(message = "Your lastname cannot be blank")
  private String lastname;
  @NotBlank(message = "Your email cannot be blank")
  @Email(message = "Your email address is not valid")
  private String email;
  @NotBlank(message = "Your username cannot be blank")
  private String username;
  @NotBlank(message = "Your password cannot be blank")
  private String password;
  @NotNull(message = "Role cannot be null")
  private Role role;
  private String profilePictureUri;
}

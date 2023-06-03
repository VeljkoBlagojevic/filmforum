package rs.ac.bg.fon.filmforum_backend.seeder;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import rs.ac.bg.fon.filmforum_backend.auth.AuthenticationService;
import rs.ac.bg.fon.filmforum_backend.auth.RegisterRequest;
import rs.ac.bg.fon.filmforum_backend.domain.Role;

@Component
@RequiredArgsConstructor
public class UserSeeder {

    private final AuthenticationService authenticationService;

    public void seedAdmin() {
        RegisterRequest admin = RegisterRequest.builder()
                .email("admin@gmail.com")
                .username("admin")
                .password("admin")
                .firstname("Admin")
                .lastname("Admin")
                .role(Role.ADMIN)
                .build();
        try {
            authenticationService.register(admin);
        } catch (Exception ignored) {
        }
    }

}

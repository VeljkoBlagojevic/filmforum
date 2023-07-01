package rs.ac.bg.fon.filmforum_backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static rs.ac.bg.fon.filmforum_backend.domain.Role.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.configure(http))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/api/v1/seed**").permitAll()

                        .requestMatchers(HttpMethod.PUT, "/api/v1/movies/**").hasAuthority(ADMIN.getAuthority())

                        .requestMatchers(HttpMethod.POST, "/api/v1/reviews/**").hasAuthority(CRITIC.getAuthority())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/reviews/**").hasAnyAuthority(CRITIC.getAuthority(), ADMIN.getAuthority())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/reviews/**").hasAuthority(CRITIC.getAuthority())

                        .requestMatchers(HttpMethod.GET, "/api/v1/watchlist/movies**").hasAuthority(USER.getAuthority())
                        .requestMatchers(HttpMethod.POST, "/api/v1/watchlist/**").hasAuthority(USER.getAuthority())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/watchlist/**").hasAuthority(USER.getAuthority())

                        .anyRequest().authenticated())
                .sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

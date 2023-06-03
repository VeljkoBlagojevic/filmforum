package rs.ac.bg.fon.filmforum_backend.dto.mapper;

import org.springframework.stereotype.Component;
import rs.ac.bg.fon.filmforum_backend.domain.User;
import rs.ac.bg.fon.filmforum_backend.dto.UserDTO;

@Component
public class UserMapper implements DTOMapper<User, UserDTO> {
    @Override
    public User mapFromDTO(UserDTO userDTO) {
        return User.builder()
                .id(userDTO.id())
                .firstname(userDTO.firstname())
                .lastname(userDTO.lastname())
                .username(userDTO.username())
                .email(userDTO.email())
                .role(userDTO.role())
                .build();
    }

    @Override
    public UserDTO mapToDTO(User entity) {
        return new UserDTO(
                entity.getId(),
                entity.getFirstname(),
                entity.getLastname(),
                entity.getEmail(),
                entity.getUsername(),
                entity.getRole()
        );
    }
}

package rs.ac.bg.fon.filmforum_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.filmforum_backend.dto.UserDTO;
import rs.ac.bg.fon.filmforum_backend.dto.mapper.UserMapper;
import rs.ac.bg.fon.filmforum_backend.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping
    public Page<UserDTO> getAllUsers(Pageable pageable) {
        return userService.getAll(pageable).map(userMapper::mapToDTO);
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        return userMapper.mapToDTO(userService.getById(id));
    }

    @GetMapping("/username/{username}")
    public UserDTO getUserByUsername(@PathVariable String username) {
        return userMapper.mapToDTO(userService.getByUsername(username));
    }

    @GetMapping("/currentlyLoggedIn")
    public UserDTO getCurrentlyLoggedInUser() {
        return userMapper.mapToDTO(userService.getCurrentlyLoggedInUser());
    }

    @GetMapping("/otherUsers")
    public Page<UserDTO> getOtherUsers(Pageable pageable) {
        return userService.getOtherUsers(pageable).map(userMapper::mapToDTO);
    }


}

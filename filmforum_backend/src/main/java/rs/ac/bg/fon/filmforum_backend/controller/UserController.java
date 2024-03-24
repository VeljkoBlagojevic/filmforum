package rs.ac.bg.fon.filmforum_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import rs.ac.bg.fon.filmforum_backend.domain.User;
import rs.ac.bg.fon.filmforum_backend.dto.UserDTO;
import rs.ac.bg.fon.filmforum_backend.dto.mapper.UserMapper;
import rs.ac.bg.fon.filmforum_backend.service.ImageService;
import rs.ac.bg.fon.filmforum_backend.service.UserService;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ImageService imageService;
    private final UserMapper userMapper;
    private static final String IMAGE_DIRECTORY = "src/main/resources/static/images";

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

    @PostMapping("/profilePicture")
    public String uploadImage(@RequestParam("imageFile") MultipartFile imageFile) throws IOException {
        User currentlyLoggedInUser = userService.getCurrentlyLoggedInUser();
        String imageName = imageService.saveImageToStorage(IMAGE_DIRECTORY, imageFile, currentlyLoggedInUser);
        currentlyLoggedInUser.setProfilePictureUri(imageName);
        userService.save(currentlyLoggedInUser);
        return imageName;
    }

    @GetMapping("/{userId}/profilePicture")
    public byte[] getImage(@PathVariable Long userId) throws IOException {
        String profilePictureUri = userService.getById(userId).getProfilePictureUri();
        return imageService.getImage(IMAGE_DIRECTORY, profilePictureUri);
    }


}

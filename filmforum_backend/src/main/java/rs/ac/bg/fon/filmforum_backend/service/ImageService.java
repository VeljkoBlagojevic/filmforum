package rs.ac.bg.fon.filmforum_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rs.ac.bg.fon.filmforum_backend.domain.User;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Service
public class ImageService {

    public String saveImageToStorage(String uploadDirectory, MultipartFile imageFile, User user) throws IOException {
        String uniqueFileName = getProfilePictureName(user) + "_" + imageFile.getOriginalFilename();

        Path uploadPath = Path.of(uploadDirectory);
        Path filePath = uploadPath.resolve(uniqueFileName);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return uniqueFileName;
    }

    public byte[] getImage(String imageDirectory, String imageName) throws IOException {
        Path imagePath = Path.of(imageDirectory, imageName);

        if (!Files.exists(imagePath)) {
            return null;
        }

        return Files.readAllBytes(imagePath);
    }

    private String getProfilePictureName(User user) {
        return user.getId() + "_" + user.getUsername();
    }
}

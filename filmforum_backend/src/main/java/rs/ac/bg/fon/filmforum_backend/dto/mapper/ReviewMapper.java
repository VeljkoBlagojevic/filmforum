package rs.ac.bg.fon.filmforum_backend.dto.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import rs.ac.bg.fon.filmforum_backend.domain.Review;
import rs.ac.bg.fon.filmforum_backend.dto.ReviewDTO;

@Component
@RequiredArgsConstructor
public class ReviewMapper implements DTOMapper<Review, ReviewDTO> {
    private final UserMapper userMapper;
    private final MovieMapper movieMapper;

    @Override
    public Review mapFromDTO(ReviewDTO reviewDTO) {
        return Review.builder()
                .id(reviewDTO.id())
                .content(reviewDTO.content())
                .author(userMapper.mapFromDTO(reviewDTO.author()))
                .date(reviewDTO.date())
                .movie(movieMapper.mapFromDTO(reviewDTO.movie()))
                .rating(reviewDTO.rating())
                .build();
    }

    @Override
    public ReviewDTO mapToDTO(Review entity) {
        return new ReviewDTO(
                entity.getId(),
                entity.getContent(),
                userMapper.mapToDTO(entity.getAuthor()),
                entity.getDate(),
                movieMapper.mapToDTO(entity.getMovie()),
                entity.getRating()
        );
    }
}

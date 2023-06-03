package rs.ac.bg.fon.filmforum_backend.dto.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import rs.ac.bg.fon.filmforum_backend.domain.WatchList;
import rs.ac.bg.fon.filmforum_backend.dto.WatchListDTO;

@Component
@RequiredArgsConstructor
public class WatchListMapper implements DTOMapper<WatchList, WatchListDTO> {

    private final UserMapper userMapper;
    private final MovieMapper movieMapper;

    @Override
    public WatchList mapFromDTO(WatchListDTO watchListDTO) {
        return WatchList.builder()
                .id(watchListDTO.id())
                .user(userMapper.mapFromDTO(watchListDTO.user()))
                .movies(movieMapper.mapFromDTO(watchListDTO.movies()))
                .build();
    }

    @Override
    public WatchListDTO mapToDTO(WatchList entity) {
        return new WatchListDTO(
                entity.getId(),
                userMapper.mapToDTO(entity.getUser()),
                movieMapper.mapToDTO(entity.getMovies())
        );
    }
}

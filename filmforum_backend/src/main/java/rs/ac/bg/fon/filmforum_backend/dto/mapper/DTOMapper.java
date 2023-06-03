package rs.ac.bg.fon.filmforum_backend.dto.mapper;

import java.util.List;

public interface DTOMapper<E, DTO> {
    E mapFromDTO(DTO dto);
    DTO mapToDTO(E entity);
    default List<E> mapFromDTO(List<DTO> dtos) {
        return dtos.stream().map(this::mapFromDTO).toList();
    }
    default List<DTO> mapToDTO(List<E> entities) {
        return entities.stream().map(this::mapToDTO).toList();
    }
}

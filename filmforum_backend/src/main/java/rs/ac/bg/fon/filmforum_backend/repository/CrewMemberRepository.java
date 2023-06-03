package rs.ac.bg.fon.filmforum_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.filmforum_backend.domain.CrewMember;

import java.util.Optional;

@Repository
public interface CrewMemberRepository extends JpaRepository<CrewMember, String> {
    Optional<CrewMember> findByCreditId(String creditId);
}

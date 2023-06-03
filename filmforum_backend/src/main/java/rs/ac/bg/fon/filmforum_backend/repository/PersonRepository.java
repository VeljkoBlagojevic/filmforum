package rs.ac.bg.fon.filmforum_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.filmforum_backend.domain.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
}

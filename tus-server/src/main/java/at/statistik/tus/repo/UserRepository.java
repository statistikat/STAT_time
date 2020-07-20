package at.statistik.tus.repo;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.repository.CrudRepository;

import at.statistik.tus.entity.User;

public interface UserRepository extends CrudRepository<User, Long> {

	public User findByUsername(String username);
	
	@EntityGraph(value = "userWithData", type = EntityGraphType.FETCH)
	public User readByUsername(String username);
}

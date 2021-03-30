package at.statistik.tus.repo;

import org.springframework.data.repository.CrudRepository;

import at.statistik.tus.entity.Dict;

public interface DictRepository extends CrudRepository<Dict, Long> {

}

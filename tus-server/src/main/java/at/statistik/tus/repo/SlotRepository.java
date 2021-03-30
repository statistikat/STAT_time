package at.statistik.tus.repo;

import java.util.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import at.statistik.tus.entity.Quest;
import at.statistik.tus.entity.Slot;

public interface SlotRepository extends CrudRepository<Slot, Long> {

	public List<Slot> findByQuestAndStart(Quest quest, Date start);
}

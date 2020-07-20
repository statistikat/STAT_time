package at.statistik.tus.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.SequenceGenerator;

import lombok.Data;

@MappedSuperclass
@Data
public class EntityTus {

	@Id
	@GeneratedValue(generator = "KeySeq")
	@SequenceGenerator(name = "KeySeq", sequenceName = "KEY_SEQ", allocationSize = 1)
	private Long id;

	protected EntityTus() {
	}
}

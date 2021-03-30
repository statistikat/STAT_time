package at.statistik.tus.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Entity
@Table(name = "TDICT")
public class Dict extends EntityTus {

	@Column(name = "VAR")
	private Boolean var;

	@Column(name = "ENTRY")
	private String entry;
}

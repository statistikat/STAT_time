package at.statistik.tus.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true, exclude = { "quest" })
@Entity
@Table(name = "TSLOT")
public class Slot extends EntityTus {

	@ManyToOne(fetch = FetchType.LAZY /* TODO: cascade types */)
	@JoinColumn(name = "QUEST_ID", columnDefinition = "BIGINT", nullable = false)
	@JsonIgnore
	private Quest quest;

	@JsonProperty
	public Long getQuestId() {
		return this.quest == null ? null : this.quest.getId();
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "START")
	private Date start;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "ENDE")
	private Date ende;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "UPDATED")
	private Date updated;

	@Column(name = "ALLEIN")
	private Boolean allein;

	@Column(name = "PARTNER")
	private Boolean partner;

	@Column(name = "KIND")
	private Boolean kind;

	@Column(name = "MITGLEID")
	private Boolean mitglied;

	@Column(name = "ANDERE")
	private Boolean andere;

	@Column(name = "ORT")
	private Integer ort;

	@Column(name = "PRIMARY_ACTIVITY")
	private String primaryActivity;

	@Column(name = "SECONDARY_ACTIVITY")
	private String secondaryActivity;

}

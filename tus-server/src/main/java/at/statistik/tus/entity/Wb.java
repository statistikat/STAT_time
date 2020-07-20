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
@Table(name = "TWB")
public class Wb extends EntityTus {

	@ManyToOne(fetch = FetchType.LAZY /* TODO: cascade types */)
	@JoinColumn(name = "QUEST_ID", columnDefinition = "BIGINT", nullable = false)
	@JsonIgnore
	private Quest quest;

	@JsonProperty
	public Long getQuestId() {
		return this.quest == null ? null : this.quest.getId();
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "AT")
	private Date at;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "UPDATED")
	private Date updated;

	@Column(name = "LATER_QUESTION")
	private Boolean later;

	@Column(name = "LUCKY_QUESTION")
	private Integer lucky;

	@Column(name = "RELAXED_QUESTION")
	private Integer relaxed;

	@Column(name = "LIKE_QUESTION")
	private Integer like;


}

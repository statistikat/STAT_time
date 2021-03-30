package at.statistik.tus.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
@ToString(callSuper = true, exclude = { "user" })
@Entity
@Table(name = "TQUEST")
public class Quest extends EntityTus {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_ID", columnDefinition = "BIGINT", nullable = false)
	@JsonIgnore
	private User user;

	@JsonProperty
	public Long getUserId() {
		return this.user == null ? null : this.user.getId();
	}

	@Column(name = "QUEST_NO")
	private Integer questNo;

	@Column(name = "FINISHED")
	private Boolean finished;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CREATED")
	private Date created;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "UPDATED")
	private Date updated;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "quest", cascade = { CascadeType.DETACH, CascadeType.MERGE,
			CascadeType.PERSIST, CascadeType.REFRESH })
	private List<Slot> slots;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "quest", cascade = { CascadeType.DETACH, CascadeType.MERGE,
			CascadeType.PERSIST, CascadeType.REFRESH })
	private List<Wb> wbs;

}

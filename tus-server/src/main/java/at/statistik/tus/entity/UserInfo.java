package at.statistik.tus.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Entity
@Table(name = "TUSERINFO")
public class UserInfo extends EntityTus {

	@ManyToOne(fetch = FetchType.LAZY /* TODO: cascade types */)
	@JoinColumn(name = "USER_ID", columnDefinition = "BIGINT", nullable = false)
	@JsonIgnore
	private User user;

	@JsonProperty
	public Long getUserId() {
		return this.user == null ? null : this.user.getId();
	}

	@Column(name = "KEY")
	private String key;

	@Column(name = "VALUE")
	private String value;
}

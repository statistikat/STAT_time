package at.statistik.tus.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.NamedEntityGraphs;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true, exclude = { "userWbs", "userInfos", "logs", "quests" })
@NamedEntityGraphs({ @NamedEntityGraph(name = "userWithData", attributeNodes = { @NamedAttributeNode(value = "userWbs"),
		@NamedAttributeNode(value = "userWbs") }) })
// @NamedEntityGraphs({ @NamedEntityGraph(name = "userWithData", attributeNodes
// = { @NamedAttributeNode(value = "userWbs"),
// @NamedAttributeNode(value = "quests", subgraph = "questSubgraph"), },
// subgraphs = {
// @NamedSubgraph(name = "questSubgraph", attributeNodes = {
// @NamedAttributeNode("slots") }) }) })
@Entity
@Table(name = "TUSER")
public class User extends EntityTus {

	@Column(name = "USERNAME")
	private String username;

	@Column(name = "PASSWORD")
	private String password;

	@Temporal(TemporalType.DATE)
	@Column(name = "DAY")
	private Date day;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FIRST_LOGIN")
	private Date firstLogin;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "LAST_LOGIN")
	private Date lastLogin;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = { CascadeType.DETACH, CascadeType.MERGE,
			CascadeType.PERSIST, CascadeType.REFRESH })
	private List<UserWb> userWbs;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private List<UserInfo> userInfos;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private List<Log> logs;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = { CascadeType.DETACH, CascadeType.MERGE,
			CascadeType.PERSIST, CascadeType.REFRESH })
	private List<Quest> quests;
}

package at.statistik.tus;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;

import at.statistik.spring.commons.lang.StatCommonsLangConfig;
import at.statistik.spring.commons.lang.date.DateUtils;
import at.statistik.spring.commons.security.StatCommonsSecurityConfig;
import at.statistik.spring.commons.security.dbmodel.Group;
import at.statistik.spring.commons.security.dbmodel.User;
import at.statistik.spring.commons.security.pvp.DbAccess;
import at.statistik.spring.commons.security.pvp.PVPConstants;

/**
 * Haupteinstiegspunkt
 */

@SpringBootApplication
@EnableEncryptableProperties
@Import(value = { StatCommonsLangConfig.class, StatCommonsSecurityConfig.class })
public class TusApplication {

	private static final Logger log = LoggerFactory.getLogger(TusApplication.class);

	public static final String PROFILE_DEV = "dev";
	public static final String PROFILE_TEST = "test";
	public static final String PROFILE_PROD = "prod";

	public static final String PROFILE_AUTH_MEM_H2 = "authmemh2";
	public static final String PROFILE_AUTH_DB_H2 = "authdbh2";
	public static final String PROFILE_AUTH_DB_DB2 = "authdbdb2";
	public static final String PROFILE_AUTH_DB_PG = "authdbpg";

	public static final String PROFILE_DATA_DB_H2 = "datadbh2";
	public static final String PROFILE_DATA_DB_DB2 = "datadbdb2";
	public static final String PROFILE_DATA_DB_PG = "datadbpg";

	public static final String GROUP_ADMIN = "Admin";
	public static final String GROUP_SAB = "SachbearbeiterBpk";
	public static final String GROUP_NUTZER = "Nutzer";
	
	public static final String USER_PASSWORT = "starter2test";

	public static final String USER_GEORG = "georg";
	public static final String USER_SAB_WT_UR = "sab.wtur@statistik.gv.at";


	@Autowired
	private Environment environment;

	@Autowired
	private DbAccess dbAccess;

	public static void main(String[] args) {
		SpringApplication.run(TusApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo() { // TODO Repos hier als Argument mitgeben
		return (args) -> {

			log.info("Active profiles: ");
			for (String profile : environment.getActiveProfiles()) {
				log.info(profile);
			}

			// Add Groups if necessary

			boolean groupAdminGefunden = false;
			for (Group group : dbAccess.getAllGroups()) {
				if (group.getGroupname().equals(GROUP_ADMIN)) {
					groupAdminGefunden = true;
				}
			}

			// boolean h2Profile = false;
			// for(String profile : environment.getActiveProfiles()) {
			// if(profile.equals(PROFILE_AUTH_MEM_H2) ||
			// profile.equals(PROFILE_AUTH_DB_H2)) {
			// h2Profile = true;
			// break;
			// }
			// }

			// Wenn Admin Gruppe (und somit auch Users) nicht gefunden -> lege
			// die Gruppen und User an
			if (groupAdminGefunden == false) {
				for (Group group : TusApplication.getInitialGroups()) {
					dbAccess.erstelleGruppe(group);
				}

				dbAccess.init();

				// Add Users to Auth-System

				List<Group> groups = getInitialGroups();
				addUsers(dbAccess, groups);
			}
		};

	}

	public static List<Group> getInitialGroups() {

		// Setze Dummy Groups zum Testen
		List<Group> groups = new ArrayList<>();

		Timestamp von = new Timestamp(DateUtils.parseDateString("2016-01-01").getTime());

		Group group = new Group();
		group.setGroupid("1");
		group.setGroupname(GROUP_ADMIN);
		group.setTimestampVon(von);
		group.setTimestampBis(PVPConstants.OPENEND);
		groups.add(group);

		group = new Group();
		group.setGroupid("2");
		group.setGroupname(GROUP_SAB);
		group.setTimestampVon(von);
		group.setTimestampBis(PVPConstants.OPENEND);
		groups.add(group);

		group = new Group();
		group.setGroupid("3");
		group.setGroupname(GROUP_NUTZER);
		group.setTimestampVon(von);
		group.setTimestampBis(PVPConstants.OPENEND);
		groups.add(group);

		return groups;
	}

	public static void addUsers(DbAccess dbAccess, List<Group> groups) {

		Map<String, Group> groupMap = new HashMap<>();
		for (Group group : groups) {
			groupMap.put(group.getGroupid(), group);
		}

		Timestamp von = new Timestamp(DateUtils.parseDateString("2016-01-01").getTime());

		// Georg in Gruppe Nutzer
		User user = addUser("1", USER_GEORG, "Georg", "Nozicka", "N/A", groupMap.get("3"), dbAccess);

		// SAB WT-UR in Gruppe SachbearbeiterBpk
		user = addUser("1021", USER_SAB_WT_UR, "WTUR", "Sachbearbeiter", "N/A", groupMap.get("2"), dbAccess);
		dbAccess.erstelleUserAttribute(user, "BKZ", "WT-UR", von);
	}

	private static User addUser(String userId, String userName, String vorname, String nachname, String gvGid, Group group, DbAccess dbAccess) {

		Timestamp von = new Timestamp(DateUtils.parseDateString("2016-01-01").getTime());

		User user = dbAccess.createNewUser(userName, von);
		user.setPassword(USER_PASSWORT);

		dbAccess.erstelleUserAttribute(user, "NAME", nachname + " " + vorname, von);
		dbAccess.erstelleUserAttribute(user, "VORNAME", vorname, von);
		dbAccess.erstelleUserAttribute(user, "NACHNAME", nachname, von);
		dbAccess.erstelleUserAttribute(user, "GID", gvGid, von);

		dbAccess.erstelleUser2Group(user, group.getGroupid(), von);

		dbAccess.persistUser(user);

		return user;
	}
}

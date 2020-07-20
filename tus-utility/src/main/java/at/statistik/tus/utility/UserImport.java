package at.statistik.tus.utility;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Generiert eine Liste von SQL-INSERT-Statements aus einer CSV-Datei (TUS-Benutzer).
 * 
 * <p>Spalten:
 * <table>
 * <tr><td>A</td><td>Username</td></tr>
 * <tr><td>B</td><td>Password (plain)</td></tr>
 * <tr><td>C</td><td>Tag (TT.MM.JJJJ)</td></tr>
 * <tr><td>D</td><td>Wellbeing Zeit 1 (hhmm, z.B. 920 für 9:20 Uhr)</td></tr>
 * <tr><td>E</td><td>Wellbeing Zeit 2</td></tr>
 * <tr><td>F</td><td>Wellbeing Zeit 3</td></tr>
 * <tr><td>G</td><td>Wellbeing Zeit 4</td></tr>
 * <tr><td>H</td><td>Wellbeing-Zeit für Rückerinnerung (1 - 4)</td></tr>
 * </table>
 * </p>
 * 
 * Die erste Zeile enthält die Überschriften und wird ignoriert.
 * 
 * @author KITTEL
 * @see JIRA TUS-38
 */
/* Ausführung dieser Klasse direkt in der Entwicklungsumgebung vorgesehen. Pfade sind fix codiert.
 * Quelldatei: D:\tus-users.csv
 * Zieldatei: D:\tus-users.sql
 */
public class UserImport {	
	private static final String TABLESPACE_P = "TUSP";
	private static final String AUTHTABLE = TABLESPACE_P + ".TAUTHUSER";
	private static final String USERTABLE = TABLESPACE_P + ".TUSER";
	private static final String USERWBTABLE = TABLESPACE_P + ".TUSER_WB";
	
	private final MessageDigest digest;
	private final List<UserEntry> users = new ArrayList<>();
	private final List<String> statements = new ArrayList<>();

	public UserImport() throws NoSuchAlgorithmException {
		digest = MessageDigest.getInstance("SHA-256");
	}
	
	private void run() throws IOException {
		read();
		build();
		output();
	}
	
	private void read() throws IOException {
		List<String> lines = Files.readAllLines(Paths.get("D:/tus-user.csv"), Charset.forName("Windows-1252"));
		boolean firstLine = true;
		for (String line : lines) {
			if (firstLine) {
				firstLine = false;
				continue;
			}
			String[] fields = line.split(";");
			if (fields.length == 0) {
				continue;
			}
			String username = fields[0].trim();
			if (username.isEmpty()) {
				continue;
			}
			UserEntry entry = new UserEntry();
			entry.setUsername(fields[0].trim());
			entry.setPassword(hash(fields[1].trim()));
			entry.setTag(fields[2].trim());
			for (int wb = 1; wb <= 4; wb++) {
				entry.addWb(Integer.parseInt(fields[wb + 2].trim()));
			}
			entry.setLater(Integer.parseInt(fields[7].trim()));
			users.add(entry);
			System.out.println(entry);
		}
	}
	
	private String hash(String plain) {
		byte[] hash = digest.digest(plain.getBytes(StandardCharsets.UTF_8));
		StringBuilder result = new StringBuilder();
		for (int i = 0; i < hash.length; i++) {
			String hex = Integer.toHexString(0xff & hash[i]);
			if (hex.length() == 1)
				result.append('0');
			result.append(hex);
		}
		return result.toString();
	}
	
	private void build() {
		String today = new SimpleDateFormat("dd.MM.yyyy").format(new Date());
		String defaultTimestamp = timestamp("31.12.2999");
		for (UserEntry user : users) {
			final String username = esc(user.getUsername());
			statements.add("INSERT INTO " + AUTHTABLE + "(USERID, USERNAME, PASSWORD, VONTIM, BISTIM) VALUES ("
					+ TABLESPACE_P + ".KEY_SEQ.NEXTVAL,'" 
					+ username + "', '"
					+ user.getPassword() + "', "
					+ timestamp(today) + ", " + defaultTimestamp + ");");
			statements.add("INSERT INTO " + USERTABLE + "(ID,USERNAME,PASSWORD,DAY,FIRST_LOGIN,LAST_LOGIN) VALUES ("
					+ TABLESPACE_P + ".KEY_SEQ.NEXTVAL,'"
					+ username + "', '"
					+ user.getPassword() + "', '"
					+ user.getTag() + "', " 
					+ defaultTimestamp + ", " + defaultTimestamp + ");");
			for (int wb = 1; wb <= user.getWbs().size(); wb++) {
				statements.add("INSERT INTO " + USERWBTABLE + "(ID,USER_ID,WB,LATER) VALUES ("
						+ TABLESPACE_P + ".KEY_SEQ.NEXTVAL, "
						+ "(SELECT ID FROM " + USERTABLE + " WHERE USERNAME='" + username + "'), "
						+ user.getWbs().get(wb - 1) + ", "
						+ (user.getLater() == wb ? 1 : 0) + ");");
			}
		}
	}
	
	private static String esc(String str) {
		return str.replace("'", "''");
	}
	
	private static String timestamp(String date) {
		return "(TIMESTAMP(CAST('" + date + "' AS VARCHAR(10)),'00:00:00'))";
	}

	private void output() throws IOException {
		Files.write(Paths.get("D:/tus-user.sql"), statements, Charset.forName("UTF-8"));		
	}

	public static void main(String[] args) throws Exception {
		new UserImport().run();
	}

}

class UserEntry {
	private String username;
	private String password;
	private String tag;
	private final List<Integer> wbs = new ArrayList<>();
	private int later;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public int getLater() {
		return later;
	}
	public void setLater(int later) {
		this.later = later;
	}
	public List<Integer> getWbs() {
		return wbs;
	}
	public void addWb(int wb) {
		wbs.add(wb);
	}
	@Override
	public String toString() {
		return "UserEntry [username=" + username + ", password=" + password + ", tag=" + tag + ", wbs=" + wbs
				+ ", later=" + later + "]";
	}
}
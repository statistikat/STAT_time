package at.statistik.tus.utility;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Generiert eine Liste von SQL-INSERT-Statements aus einer CSV-Datei (TUS-Aktivitätenliste).
 * 
 * <p>Spalten:
 * <table>
 * <tr><td>A</td><td>Aktivität</td></tr>
 * <tr><td>B</td><td>Markierung für variable Zeitdauer</td></tr>
 * </table>
 * </p>
 * 
 * Die erste Zeile enthält die Überschriften und wird ignoriert.
 * 
 * @author KITTEL
 * @see JIRA TUS-38
 */
/* Ausführung dieser Klasse direkt in der Entwicklungsumgebung vorgesehen. Pfade sind fix codiert.
 * Quelldatei: D:\activities.csv
 * Zieldatei: D:\activities.sql
 */
public class ActivityImport {
	private static final String TABLESPACE = "TUSP";
	private static final String TABLE = TABLESPACE + ".TDICT";
	private final List<String> statements = new ArrayList<>();
	private final Set<String> activities = new HashSet<>();
	
	public void run() throws Exception {
		build();
		output();
	}
	
	private void build() throws IOException {
		List<String> lines = Files.readAllLines(Paths.get("D:/activities.csv"), Charset.forName("Windows-1252"));
		statements.add("DELETE FROM " + TABLE + ";");
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
			String entry = fields[0].trim();
			if (entry.isEmpty()) {
				continue;
			}
			if (activities.contains(entry)) {
				System.err.println("duplicate entry ignored: " + entry);
			} else {
				System.out.println(Arrays.toString(fields));
				boolean var = fields.length > 1 && !fields[1].trim().isEmpty();
				statements.add(insert(var, entry));
				activities.add(entry);
			}
		}
	}
	
	private void output() throws IOException {
		Files.write(Paths.get("D:/activities.sql"), statements, Charset.forName("UTF-8"));
	}
	
	private static String insert(boolean var, String entry) {
		StringBuilder sb = new StringBuilder();
		sb.append("INSERT INTO " + TABLE + "(ID, VAR, ENTRY) VALUES (" + TABLESPACE + ".KEY_SEQ.NEXTVAL,");
		sb.append(var ? "1" : "0").append(",'");
		String escapedEntry = entry.replaceAll("'", "''");
		sb.append(escapedEntry).append("');");
		return sb.toString();
	}
	
	public static void main(String[] args) throws Exception {
		new ActivityImport().run();
	}

}


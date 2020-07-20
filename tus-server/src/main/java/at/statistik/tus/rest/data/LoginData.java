package at.statistik.tus.rest.data;
 
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode()
@ToString()
public class LoginData {
	
	private String userid;
	private String password;
	private String version;
	private String log;

}

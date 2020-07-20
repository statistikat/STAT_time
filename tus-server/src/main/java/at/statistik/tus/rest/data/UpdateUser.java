package at.statistik.tus.rest.data;

import at.statistik.tus.entity.User;
import lombok.Data;

@Data
public class UpdateUser {

	private Boolean success;
	private LoginData loginData;
	private User user;
}

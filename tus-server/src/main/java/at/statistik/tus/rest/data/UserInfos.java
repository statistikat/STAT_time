package at.statistik.tus.rest.data;

import java.util.List;

import lombok.Data;

@Data
public class UserInfos {
	
	private String info;
	private String participantId;
	private String userName;
	private String userId;
	private List<String> groups;

}

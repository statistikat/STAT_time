package at.statistik.tus.rest.data;

import lombok.Data;

@Data
public class PostResult {
	
	private int status;
	
	public PostResult(int status) {
		this.status = status;
	}

}

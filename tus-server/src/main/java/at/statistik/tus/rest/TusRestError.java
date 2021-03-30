package at.statistik.tus.rest;

import lombok.Getter;

public class TusRestError {
	
	@Getter
	private int status;
	
	@Getter
	private String message;
	
	public TusRestError(int status, String message) {
		this.status = status;
		this.message = message;
	}

	public String toString() {
		return status + ": " + message;
	}
}

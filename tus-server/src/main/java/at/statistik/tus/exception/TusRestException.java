package at.statistik.tus.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

public class TusRestException extends Exception {

	private static final long serialVersionUID = 8886953520222142620L;
	
	@Getter
	private HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
	
	public TusRestException(String msg) {
		super(msg);
	}
	
	public TusRestException(String msg, HttpStatus httpStatus) {
		super(msg);
		
		this.httpStatus = httpStatus;
	}

}

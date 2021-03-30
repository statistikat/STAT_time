package at.statistik.tus;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.security.util.InMemoryResource;

public class AuthResourceLoader extends DefaultResourceLoader {

	private Map<String, String> map;

	InMemoryResource imr = null;

	public AuthResourceLoader(Map<String, String> map) {

		this.map = map;
	}

	@Override
	public Resource getResource(String location) {

		InMemoryResource imr = null;

		try {
			Resource resource = super.getResource(location);
			InputStream is = resource.getInputStream();

			try (BufferedReader buffer = new BufferedReader(new InputStreamReader(is))) {

				StringBuffer content = new StringBuffer();
				String line;
				while ((line = buffer.readLine()) != null) {

					for (Entry<String, String> entry : map.entrySet()) {
						line = line.replaceAll(entry.getKey(), entry.getValue());
					}

					content.append(line + "\n");
				}

				imr = new InMemoryResource(content.toString());
			}

		} catch (IOException ex) {
			throw new RuntimeException(ex);
		}

		return imr;
	}

}

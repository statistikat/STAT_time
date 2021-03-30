package at.statistik.tus.rest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.IOException;
import java.util.Arrays;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.context.WebApplicationContext;

import at.statistik.tus.JunitBase;
import at.statistik.tus.TusApplication;

public class TestTusRest extends JunitBase {

	private static final Logger log = LoggerFactory.getLogger(TestTusRest.class);

	//private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

	@Autowired
	private WebApplicationContext webApplicationContext;

	private HttpMessageConverter<Object> mappingJackson2HttpMessageConverter;

	private MockMvc mockMvc;

	@Autowired
	void setConverters(HttpMessageConverter<Object>[] converters) {

		this.mappingJackson2HttpMessageConverter = Arrays.asList(converters).stream().filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter)
				.findAny().get();

		Assert.assertNotNull("the JSON message converter must not be null", this.mappingJackson2HttpMessageConverter);
	}

	@Before
	public void setup() throws Exception {
		this.mockMvc = webAppContextSetup(webApplicationContext).build();

	}

	@Test
	@WithMockUser(username = TusApplication.USER_GEORG, roles = { "BASIC" })
	// @WithUserDetails("ram")
	public void testHello() throws Exception {

		ResultActions ra = mockMvc.perform(get("/hello"));

		ra.andExpect(status().isOk());

		String qj = ra.andReturn().getResponse().getContentAsString();

		log.info("Result as JSON = " + qj.toString());

	}
	
	/**
	 * HELPER
	 */

//	private <T> T fromJson(ResultActions ra, Class<T> clazz) throws JsonParseException, JsonMappingException, IOException {
//
//		String qj = ra.andReturn().getResponse().getContentAsString();
//		return new ObjectMapper().readValue(qj, clazz);
//	}

//	private <T> List<T> listFromJson(ResultActions ra, Class<T[]> clazz) throws JsonParseException, JsonMappingException, IOException {
//
//		T[] qarr = fromJson(ra, clazz);
//		return Arrays.asList(qarr);
//	}

	protected String json(Object o) throws IOException {
		MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
		this.mappingJackson2HttpMessageConverter.write(o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
		return mockHttpOutputMessage.getBodyAsString();
	}

}

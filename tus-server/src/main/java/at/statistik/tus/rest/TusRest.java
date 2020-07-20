package at.statistik.tus.rest;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import at.statistik.spring.commons.security.pvp.PVPRequestHeaderAuthenticationFilter;
import at.statistik.tus.entity.Dict;
import at.statistik.tus.entity.User;
import at.statistik.tus.repo.DictRepository;
import at.statistik.tus.rest.data.LoginData;
import at.statistik.tus.rest.data.UpdateUser;
import at.statistik.tus.security.ApplicationBenutzerprofil;
import at.statistik.tus.security.ApplicationUserData;
import at.statistik.tus.service.TestService;
import at.statistik.tus.service.UserService;

@RestController
@CrossOrigin(origins = { "*" }, exposedHeaders = {
		PVPRequestHeaderAuthenticationFilter.AUTH_TOKEN })
public class TusRest {

	private static final Logger log = LoggerFactory.getLogger(TusRest.class);

	@Autowired
	private ApplicationBenutzerprofil applicationBenutzerprofil;

	@Autowired
	private UserService userService;

	@Autowired
	private TestService testService;

	@Autowired
	private DictRepository dictRepository;

	@RequestMapping(value = "/open/hello", method = RequestMethod.GET)
	public Map<String, Object> helloOpen() {
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("id", UUID.randomUUID().toString());
		model.put("content", "Hello World Open");
		TusRest.log.info("Hello!");
		return model;
	}

	@PreAuthorize("hasRole('BASIC')")
	@RequestMapping(value = "/hello", method = RequestMethod.GET)
	public Map<String, Object> helloAuth() {
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("id", UUID.randomUUID().toString());
		model.put("content", "Hello World Auth");
		TusRest.log.info("Hello! (with auth)");

		ApplicationUserData ud = this.applicationBenutzerprofil.getCurrentUserData();
		if (ud != null) {
			log.info("Benutzerprofil vorhanden");
			log.info(ud.getParticipantId());
			log.info(ud.getUserid());
			log.info(ud.getUsername());
		} else {
			log.info("UserData nicht vorhanden");
		}

		return model;
	}

	@RequestMapping(value = "/open/updateUser", method = RequestMethod.POST)
	public UpdateUser updateUser(@RequestBody UpdateUser updateUser) {
		return this.userService.updateUser(updateUser);
	}

	@RequestMapping(value = "/open/getUser", method = RequestMethod.POST)
	public User getUser(@RequestBody LoginData loginData) {
		return this.userService.getUser(loginData);
	}

	@RequestMapping(value = "/open/getUserWithData", method = RequestMethod.POST)
	public User getUserWithData(@RequestBody LoginData loginData) {
	    TusRest.log.info("Hello!");
	    return this.userService.getUserWithData(loginData);
	}

	@RequestMapping(value = "/getDictionary", method = RequestMethod.GET)
	public Iterable<Dict> getDictionaryAuth() {
		return this.dictRepository.findAll();
	}

	@RequestMapping(value = "/open/getDictionary", method = RequestMethod.POST)
	public Iterable<Dict> getDictionary() {
		return this.dictRepository.findAll();
	}
	
	@RequestMapping(value = "/open/test1", method = RequestMethod.GET)
	public void test1() {
		this.testService.test1();
	}

	@RequestMapping(value = "/open/test2", method = RequestMethod.GET)
	public void test2() {
		this.testService.test2();
	}
}

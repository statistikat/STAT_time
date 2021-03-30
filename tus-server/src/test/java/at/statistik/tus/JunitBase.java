package at.statistik.tus;

import javax.transaction.Transactional;

import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import at.statistik.tus.TusApplication;

@ActiveProfiles({ TusApplication.PROFILE_DEV, TusApplication.PROFILE_AUTH_MEM_H2 })
@RunWith(SpringRunner.class)
@SpringBootTest
@Import(value = { TusApplication.class })
@WebAppConfiguration
@Transactional
public abstract class JunitBase {

}

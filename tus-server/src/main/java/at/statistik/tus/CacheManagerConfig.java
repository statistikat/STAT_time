package at.statistik.tus;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.ClassPathResource;

@Configuration
@EnableCaching
public class CacheManagerConfig {

	public static final String CACHE_MANAGER_SEC = "cacheManagerTus";

	@Bean(name = CACHE_MANAGER_SEC)
	@Primary
	public CacheManager cacheManager() {
		return new EhCacheCacheManager(ehCacheCacheManagerTus().getObject());
	}

	@Bean
	public EhCacheManagerFactoryBean ehCacheCacheManagerTus() {
		EhCacheManagerFactoryBean cmfb = new EhCacheManagerFactoryBean();
		cmfb.setConfigLocation(new ClassPathResource("ehcache_tus.xml"));
		return cmfb;
	}

}

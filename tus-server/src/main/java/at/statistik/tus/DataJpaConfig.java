package at.statistik.tus;

import java.util.Properties;

import javax.sql.DataSource;

import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.EmbeddedValueResolverAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.util.StringValueResolver;

import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;

import at.statistik.tus.entity.User;

@Configuration
@EnableJpaRepositories(entityManagerFactoryRef = "customerEntityManagerFactory", transactionManagerRef = "customerTransactionManager")

public class DataJpaConfig implements EmbeddedValueResolverAware {

	@Autowired
	private Environment environment;

	private StringValueResolver svr;

//	private static final boolean SHOW_SQL = false;

	@Override
	public void setEmbeddedValueResolver(StringValueResolver resolver) {
		svr = resolver;
	}

	@Bean
	PlatformTransactionManager customerTransactionManager() {
		return new JpaTransactionManager(customerEntityManagerFactory().getObject());
	}

	@Bean
	LocalContainerEntityManagerFactoryBean customerEntityManagerFactory() {

		HibernateJpaVendorAdapter jpaVendorAdapter = new HibernateJpaVendorAdapter();

		if (environment.acceptsProfiles(TusApplication.PROFILE_DATA_DB_H2)) {
			jpaVendorAdapter.setGenerateDdl(true);
		}
	

		LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();

		factoryBean.setDataSource(customerDataSource());
		factoryBean.setJpaVendorAdapter(jpaVendorAdapter);
		factoryBean.setPackagesToScan(User.class.getPackage().getName());

		if (environment.acceptsProfiles(TusApplication.PROFILE_DATA_DB_DB2)) {
			Properties props = new Properties();
			props.put("hibernate.dialect", "org.hibernate.dialect.DB2Dialect");
//			props.put("hibernate.show_sql", SHOW_SQL);
			factoryBean.setJpaProperties(props);
		}
		
		if (environment.acceptsProfiles(TusApplication.PROFILE_DATA_DB_PG)) {
			Properties props = new Properties();
			props.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
//			props.put("hibernate.show_sql", SHOW_SQL);
			factoryBean.setJpaProperties(props);
		}

		return factoryBean;
	}

	@Bean
	@Primary
	DataSource customerDataSource() {

		DataSource ds = null;

		if (environment.acceptsProfiles(TusApplication.PROFILE_DATA_DB_H2)) {

			PoolProperties p = new PoolProperties();
			p.setUrl("jdbc:h2:mem:dbjpa;INIT=CREATE SCHEMA IF NOT EXISTS ITBSPT\\;SET SCHEMA ITBSPT");
			p.setUsername("sa");
			p.setPassword("");
			p.setDriverClassName("org.h2.Driver");
			p.setLogValidationErrors(true);

			ds = new org.apache.tomcat.jdbc.pool.DataSource(p);

			ResourceDatabasePopulator databasePopulator = new ResourceDatabasePopulator();
			databasePopulator.setIgnoreFailedDrops(true);
			// databasePopulator.setContinueOnError(true);
			// databasePopulator.setSqlScriptEncoding("UTF-8");
			// databasePopulator.addScript(new
			// ClassPathResource("data_schema.sql"));

			DatabasePopulatorUtils.execute(databasePopulator, ds);

			// ds = new EmbeddedDatabaseBuilder().//
			// setType(EmbeddedDatabaseType.H2).//
			// setName("dbjpa").//
			// setScriptEncoding("UTF-8").//
			// ignoreFailedDrops(true).//
			// build();
		}

		else if (environment.acceptsProfiles(TusApplication.PROFILE_DATA_DB_DB2)) {

			PoolProperties p = new PoolProperties();

			p.setUrl(svr.resolveStringValue("${data.jdbc.url}"));
			p.setUsername(svr.resolveStringValue("${data.jdbc.username}"));
			p.setPassword(svr.resolveStringValue("${data.jdbc.password}"));
			p.setDriverClassName(svr.resolveStringValue("${data.jdbc.driverClassName}"));
			p.setLogValidationErrors(false);

			ds = new org.apache.tomcat.jdbc.pool.DataSource(p);
		}
		
		else if (environment.acceptsProfiles(TusApplication.PROFILE_DATA_DB_PG)) {

			PoolProperties p = new PoolProperties();

			p.setUrl(svr.resolveStringValue("${spring.datasource.url}"));
			p.setUsername(svr.resolveStringValue("${spring.datasource.username}"));
			p.setPassword(svr.resolveStringValue("${spring.datasource.password}"));
			p.setDriverClassName(svr.resolveStringValue("${spring.datasource.driverClassName}"));
			p.setLogValidationErrors(false);

			ds = new org.apache.tomcat.jdbc.pool.DataSource(p);
		}

		return ds;
	}

	@SuppressWarnings("unchecked")
	@Bean
	public Jackson2ObjectMapperBuilder configureObjectMapper() {
		return new Jackson2ObjectMapperBuilder().modulesToInstall(Hibernate5Module.class);
	}

	// @Bean
	// public Module datatypeHibernateModule() {
	// return new Hibernate5Module();
	// }

}

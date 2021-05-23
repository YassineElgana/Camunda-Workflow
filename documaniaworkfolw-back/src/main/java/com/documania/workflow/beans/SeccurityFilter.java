package com.documania.workflow.beans;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
public class SeccurityFilter {
//
//	@Bean
//	public FilterRegistrationBean filterRegistrationBean() {
//		FilterRegistrationBean registrationBean = new FilterRegistrationBean();
//
//		registrationBean.setName("camunda-auth");
//		registrationBean.setFilter(new org.camunda.bpm.engine.rest.security.auth.ProcessEngineAuthenticationFilter());
//		registrationBean.setAsyncSupported(true);
//		registrationBean.addInitParameter("authentication-provider",
//				"org.camunda.bpm.engine.rest.security.auth.impl.HttpBasicAuthenticationProvider");
//		registrationBean.addUrlPatterns("/engine-rest/**");
//		
//
//		return registrationBean;
//	}
	
//	@Bean
//	CorsConfigurationSource corsConfigurationSource() {
//		CorsConfiguration configuration = new CorsConfiguration();
//		configuration.setAllowCredentials(true);
//		configuration.addAllowedOrigin("*");
//		configuration.addAllowedHeader("*");
//		configuration.addAllowedMethod("*");
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**", configuration);
//		return source;
//	}
	
//	
//	@Bean
//	public FilterRegistrationBean CorsfilterRegistrationBean() {
//		FilterRegistrationBean registrationBean = new FilterRegistrationBean();
//
//		registrationBean.setName("CorsFilter");
//		registrationBean.setFilter(new org.apache.catalina.filters.CorsFilter());
//		
//		registrationBean.addInitParameter("cors.allowed.origins","*");
//		registrationBean.addInitParameter("cors.exposed.headers","Access-Control-Allow-Origin");
//		registrationBean.addUrlPatterns("/*");
//		return registrationBean;
//	}
}

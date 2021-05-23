package com.documania.workflow.configurations;

import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.rest.security.auth.AuthenticationProvider;
import org.camunda.bpm.engine.rest.security.auth.AuthenticationResult;

public class SecurityConfig implements AuthenticationProvider {

	
	
	@Override
	public AuthenticationResult extractAuthenticatedUser(HttpServletRequest request, ProcessEngine engine) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void augmentResponseByAuthenticationChallenge(HttpServletResponse response, ProcessEngine engine) {
		// TODO Auto-generated method stub
		System.out.println("en");
		response.addHeader("Cache-Control", "KA");
		
		
	}

}

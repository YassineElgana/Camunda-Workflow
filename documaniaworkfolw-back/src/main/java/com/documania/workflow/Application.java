package com.documania.workflow;

import java.io.File;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardWatchEventKinds;
import java.nio.file.WatchEvent;
import java.nio.file.WatchKey;
import java.nio.file.WatchService;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.ProcessEngines;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.ResourceProperties.Strategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@SpringBootApplication
public class Application implements CommandLineRunner {


	
  public static void main(String... args) {
    SpringApplication.run(Application.class, args);
  }

@Override
public void run(String... args) throws Exception {

}
  
 @Bean
 public WebMvcConfigurer corsConfigurer() {
     return new WebMvcConfigurer() {
         @Override
         public void addCorsMappings(CorsRegistry registry) {
             registry.addMapping("/engine-rest/").allowedOrigins("*");
         }
     };
 }



public void postnewModel(File file)
{
	

}

}
package br.com.metamorfose.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {
    
    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello, Metamorfose API is running!");
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "UP");
        status.put("timestamp", LocalDateTime.now().toString());
        status.put("version", "1.0.0");
        status.put("message", "Springdoc OpenAPI is configured and ready!");
        return ResponseEntity.ok(status);
    }
    
    @GetMapping("/swagger-info")
    public ResponseEntity<Map<String, String>> swaggerInfo() {
        Map<String, String> info = new HashMap<>();
        info.put("swagger-ui", "http://localhost:8080/swagger-ui.html");
        info.put("api-docs", "http://localhost:8080/v3/api-docs");
        info.put("context-path", "/");
        return ResponseEntity.ok(info);
    }
}

/**
 * File: BaseIntegrationTest.java
 * Description: Classe base para testes de integração
 * 
 * Responsabilidades:
 * - Configuração comum para testes de integração
 * - Setup de contexto Spring Boot
 * - Configuração de MockMvc
 * - Criação de dados de teste
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

package br.com.metamorfose.backend.test;

import br.com.metamorfose.backend.model.entity.User;
import br.com.metamorfose.backend.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
public class BaseIntegrationTest {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    protected UserRepository userRepository;

    protected User testUser;

    @BeforeEach
    public void setup() {
        userRepository.deleteAll();
        testUser = createTestUser();
    }

    protected User createTestUser() {
        User user = new User();
        user.setName("Test User");
        user.setEmail("test@example.com");
        user.setPassword("password123");
        return userRepository.save(user);
    }

    protected User createAdminUser() {
        User admin = new User();
        admin.setName("Admin User");
        admin.setEmail("admin@example.com");
        admin.setPassword("admin123");
        return userRepository.save(admin);
    }
}

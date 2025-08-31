package br.com.metamorfose.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                        // ===== SWAGGER E DOCUMENTACAO =====
                        .antMatchers("/v3/api-docs/**").permitAll()
                        .antMatchers("/swagger-ui/**").permitAll()
                        .antMatchers("/swagger-ui.html").permitAll()
                        .antMatchers("/api/v3/api-docs/**").permitAll() // Com context path
                        .antMatchers("/api/swagger-ui/**").permitAll() // Com context path
                        .antMatchers("/api/swagger-ui.html").permitAll() // Com context path

                        // ===== ACTUATOR E MONITORAMENTO =====
                        .antMatchers("/actuator/**").permitAll()

                        // ===== H2 CONSOLE (APENAS DESENVOLVIMENTO) =====
                        .antMatchers("/h2-console/**").permitAll()

                        // ===== ENDPOINTS DE TESTE =====
                        .antMatchers("/test/**").permitAll()

                        // ===== ENDPOINTS PUBLICOS DA API =====
                        .antMatchers("/auth/**").permitAll()
                        .antMatchers("/public/**").permitAll()

                        // ===== TODAS AS OUTRAS REQUISICOES PRECISAM DE AUTENTICACAO =====
                        .anyRequest().authenticated()
                .and()
                // Necessario para o H2 Console funcionar (permite frames)
                .headers().frameOptions().disable();
    }
}

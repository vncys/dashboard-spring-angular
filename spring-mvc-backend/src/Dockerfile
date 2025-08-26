# Metamorfose Backend Dockerfile
 # Author: Ester Silva
 # Created on: 16-08-2025
 # Squad: Metamorfose
 # Stage 1: Build
 
 FROM openjdk:21-jdk-slim as build
 WORKDIR /app
 # Copy Maven wrapper and pom.xml
 COPY mvnw .
 COPY .mvn .mvn
 COPY pom.xml .
 # Download dependencies
 RUN ./mvnw dependency:resolve
 # Copy source code
 COPY src ./src
 # Build application
 RUN ./mvnw clean package -DskipTests
 # Stage 2: Runtime
 FROM openjdk:21-jre-slim
 WORKDIR /app
 # Create non-root user
 RUN groupadd -r metamorfose && useradd -r -g metamorfose metamorfose
 # Copy jar from build stage
 COPY --from=build /app/target/metamorfose-backend-*.jar app.jar
 # Change ownership
 RUN chown -R metamorfose:metamorfose /app
 # Switch to non-root user
 USER metamorfose
 # Expose port
 EXPOSE 8080
 # Health check
 HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1
 # Run application
 ENTRYPOINT ["java", "-jar", "app.jar"]
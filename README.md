# Dashboard Angular - Smart HAS

## Descrição
Sistema web para gestão de processos automatizados, estatísticas, relatórios e configurações do projeto Smart HAS. Permite login, visualização de métricas, criação/edição de processos, gráficos e exportação de dados.

## Como rodar o projeto

### Backend (Spring Boot)
1. Abra o terminal e vá para a pasta do backend:
   ```bash
   cd spring-mvc-backend
   ```
2. Execute o backend:
   - Windows:
     ```bash
     ./mvnw spring-boot:run
     ```
   - Linux/Mac:
     ```bash
     ./mvnw spring-boot:run
     ```
3. Acesse a API e Swagger UI:
   - http://localhost:8080/api/swagger-ui.html

### Frontend (Angular)
1. Abra outro terminal e vá para a pasta do frontend:
   ```bash
   cd angular-dashboard
   ```
2. Instale as dependências (apenas na primeira vez):
   ```bash
   npm install
   ```
3. Inicie o projeto:
   ```bash
   npm start
   ```
4. Acesse no navegador:
   - http://localhost:4200

## Requisitos
- Node.js 18+
- Java 21
- Git

## Problemas comuns
- Se a porta 8080 ou 4200 estiver ocupada, troque usando:
  ```bash
  npm start -- --port=4201
  ./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
  ```
- Para erros de dependências, rode:
  ```bash
  rm -rf node_modules package-lock.json
  npm cache clean --force
  npm install
  ```

## Funcionalidades
- Login e controle de acesso
- Dashboard com métricas e gráficos
- Gestão de processos (criar, editar, excluir)
- Relatórios e exportação de dados
- Configurações do sistema

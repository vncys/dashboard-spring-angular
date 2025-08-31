# 🚀 Instalação Rápida - Dashboard Metamorfose

## 📋 Pré-requisitos

- **Node.js** versão 18 ou superior
- **npm** ou **yarn**
- **API Spring Boot** rodando em `http://localhost:8080`

## ⚡ Instalação em 4 Passos

### 1️⃣ Clone e Navegue
```bash
git clone <url-do-repositorio>
cd angular-dashboard
```

### 2️⃣ Instale Dependências
```bash
npm install
```

### 3️⃣ Verifique a API
Certifique-se de que o Spring Boot esteja rodando:
```bash
# A API deve estar acessível em:
http://localhost:8080/api
```

### 4️⃣ Execute o Projeto
```bash
npm start
```

🎉 **Pronto!** O dashboard estará disponível em `http://localhost:4200`

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm start                    # Inicia servidor de desenvolvimento
npm run build              # Build de produção
npm run build --configuration development  # Build de desenvolvimento

# Testes
npm test                   # Executa testes unitários

# Limpeza
npm run clean             # Remove arquivos de build
```

## 🌐 Acessos

- **Home**: `http://localhost:4200/home`
- **Login**: `http://localhost:4200/login`
- **Registro**: `http://localhost:4200/register`
- **Dashboard**: `http://localhost:4200/dashboard` (requer login)

## 🐛 Solução de Problemas

### Erro: "Cannot find module '@angular/core'"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "API não acessível"
- Verifique se o Spring Boot está rodando
- Confirme a porta 8080
- Verifique logs da API

### Erro: "CORS"
- A API deve permitir requisições de `http://localhost:4200`
- Verifique configuração CORS no Spring Boot

## 📱 Teste Rápido

1. Acesse `http://localhost:4200`
2. Clique em "Criar Conta"
3. Preencha o formulário
4. Faça login
5. Acesse o dashboard
6. Crie um processo de teste

## 🎯 Próximos Passos

- Configure variáveis de ambiente
- Personalize cores e temas
- Adicione novos componentes
- Implemente testes E2E

---

**Precisa de ajuda?** Consulte o README.md completo ou entre em contato com a equipe. 
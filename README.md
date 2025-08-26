# Dashboard Angular - Sistema Smart HAS

## Sobre o Projeto

Este é um dashboard administrativo desenvolvido em Angular que faz parte de um sistema maior chamado Smart HAS (Home Automation System). O projeto foi criado como atividade acadêmica para demonstrar a integração entre frontend Angular e backend Spring Boot.

O dashboard permite que usuários gerenciem processos automatizados, visualizem estatísticas em tempo real e configurem parâmetros do sistema através de uma interface web moderna e responsiva.

## O que o Sistema Faz

### Funcionalidades Principais

**Sistema de Login**
- Autenticação de usuários com email e senha
- Persistência de sessão no navegador
- Controle de acesso baseado no status de login

**Dashboard Principal**
- Exibe métricas importantes como taxa de sucesso, tempo médio de execução
- Mostra total de processos processados e economia estimada
- Botões de ação rápida para navegar entre módulos

**Gestão de Processos**
- Lista todos os processos do sistema com filtros de busca
- Permite criar novos processos com formulário completo
- Funcionalidade de edição de processos existentes
- Controle de status (iniciar, parar, visualizar, excluir)
- Timer que mostra tempo restante e total de execução

**Estatísticas e Gráficos**
- Gráfico de barras mostrando performance semanal
- Gráfico de pizza com distribuição por tipo de processo
- Gráfico de linha com tendências ao longo do tempo
- Ranking dos processos com melhor performance
- Exportação de dados em formato CSV

**Configurações do Sistema**
- Ajustes de performance (timeout, tentativas, cache)
- Configurações de notificação por email
- Parâmetros de segurança (autenticação 2FA, auditoria)
- Configuração de backup automático
- Monitoramento de status dos serviços

## Tecnologias Usadas

- **Angular 17** - Framework principal para o frontend
- **TypeScript** - Linguagem de programação
- **SCSS** - Para estilos com variáveis customizáveis
- **Material Symbols** - Ícones do Google Fonts
- **RxJS** - Para programação reativa e gerenciamento de estado

## Como Executar o Projeto

### Pré-requisitos
Antes de começar, você precisa ter instalado:
- **Node.js** (versão 18 ou mais recente)
- **npm** (vem junto com o Node.js)
- **Git** para baixar o projeto

### Passo a Passo

**1. Baixar o Projeto**
```bash
git clone https://github.com/vncys/dashboard-spring-angular.git
cd dashboard-spring-angular
```

**2. Entrar na Pasta do Angular**
```bash
cd angular-dashboard
```

**3. Instalar as Dependências**
```bash
npm install
```
*Este comando pode demorar alguns minutos na primeira vez*

**4. Iniciar o Projeto**
```bash
npm start
```

**5. Abrir no Navegador**
O projeto abrirá automaticamente em `http://localhost:4200`

## Como Testar o Sistema

### Teste Básico de Navegação
1. Acesse a página inicial
2. Clique nos botões de ação rápida
3. Verifique se todas as páginas carregam

### Teste de Login
1. Clique em "Login" no cabeçalho
2. Digite qualquer email e senha (o sistema é simulado)
3. Verifique se redireciona para o dashboard
4. Teste o logout

### Teste do Dashboard
1. Após fazer login, navegue pelo dashboard
2. Verifique se as métricas aparecem
3. Teste os botões de ação rápida
4. Navegue entre as diferentes seções

### Teste de Processos
1. Vá para a aba de processos
2. Use o campo de busca para filtrar
3. Teste a criação de um novo processo
4. Edite um processo existente
5. Verifique se o timer está funcionando

### Teste de Estatísticas
1. Acesse a página de estatísticas
2. Mude o período de análise
3. Verifique se os gráficos estão responsivos
4. Teste a exportação de dados

### Teste de Configurações
1. Vá para as configurações do sistema
2. Altere algumas configurações
3. Salve as mudanças
4. Teste a restauração dos valores padrão

## Estrutura do Projeto

```
angular-dashboard/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── auth/           # Sistema de login e registro
│   │   │   ├── dashboard/      # Dashboard principal
│   │   │   ├── home/           # Página inicial
│   │   │   ├── process/        # Gestão de processos
│   │   │   ├── settings/       # Configurações do sistema
│   │   │   └── statistics/     # Estatísticas e gráficos
│   │   ├── services/           # Serviços compartilhados
│   │   ├── app.component.ts    # Componente principal
│   │   ├── app.routes.ts       # Configuração de rotas
│   │   └── app.config.ts       # Configuração da aplicação
│   ├── styles.scss             # Estilos globais
│   └── index.html              # Página HTML principal
├── package.json                 # Dependências e scripts
└── README.md                    # Este arquivo
```

## Comandos Úteis

```bash
# Desenvolvimento
npm start          # Inicia o servidor de desenvolvimento
npm run build     # Gera build de produção
npm run test      # Executa os testes
npm run lint      # Verifica qualidade do código

# Produção
npm run build:prod    # Build otimizado para produção
```

## Personalização

### Mudando Cores
As cores do sistema podem ser alteradas editando o arquivo `src/styles.scss`. Procure pelas variáveis CSS no início do arquivo:

```scss
:root {
  --primary-color: #6366f1;      # Cor principal
  --secondary-color: #8b5cf6;    # Cor secundária
  --success-color: #10b981;      # Cor de sucesso
  --warning-color: #f59e0b;      # Cor de aviso
  --error-color: #ef4444;        # Cor de erro
}
```

### Modificando Componentes
Todos os componentes são standalone (Angular 17), o que significa que podem ser facilmente modificados. Cada componente está em sua própria pasta com arquivos `.ts`, `.html` e `.scss`.

## Solução de Problemas

### Erro de Compilação
Se der erro ao compilar:
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Porta em Uso
Se a porta 4200 estiver ocupada:
```bash
npm start -- --port 4201
```

### Problemas de Roteamento
- Verifique se todas as rotas estão definidas em `app.routes.ts`
- Confirme se os componentes estão sendo importados corretamente

## Sobre o Desenvolvedor

Este projeto foi desenvolvido por **Vinicius** como parte de seus estudos em Sistemas de Informação. O objetivo era criar um dashboard completo e funcional que demonstrasse boas práticas de desenvolvimento web.

---

**Nota**: Este projeto mostra como construir uma aplicação web moderna usando Angular 17, com foco em experiência do usuário, design responsivo e código limpo e organizado.
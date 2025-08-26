# Dashboard Angular - Sistema Smart HAS

## 📋 Descrição do Projeto

Este projeto implementa um **Dashboard Administrativo Angular** para o sistema **Smart HAS (Home Automation System)**, desenvolvido como parte de uma atividade acadêmica que integra frontend Angular com backend Spring Boot.

O dashboard permite aos usuários gerenciar processos automatizados, visualizar estatísticas em tempo real, configurar parâmetros do sistema e monitorar o status de execução das tarefas automatizadas.

## 🎯 Funcionalidades Principais

### 🔐 Sistema de Autenticação
- **Login/Logout** com persistência de sessão
- **Controle de acesso** baseado em status de autenticação
- **Interface responsiva** que se adapta ao estado do usuário

### 📊 Dashboard Principal
- **Métricas em tempo real** (Taxa de Sucesso, Tempo Médio, Total Processado, Economia Estimada)
- **Cards informativos** com indicadores visuais
- **Ações rápidas** para navegação entre módulos

### ⚙️ Gerenciamento de Processos
- **Listagem completa** de processos com filtros e busca
- **Criação de novos processos** com formulário validado
- **Edição de processos** existentes
- **Controle de status** (Iniciar, Parar, Visualizar, Excluir)
- **Timer de execução** com tempo restante/total

### 📈 Estatísticas e Análises
- **Gráficos de performance** (barras, pizza, linha)
- **Métricas comparativas** com períodos anteriores
- **Insights automáticos** com recomendações
- **Ranking de processos** por performance
- **Exportação de dados** em formato CSV

### 🔧 Configurações do Sistema
- **Parâmetros de performance** (timeout, tentativas, cache)
- **Configurações de notificação** (email, níveis)
- **Segurança** (autenticação 2FA, auditoria)
- **Backup automático** com frequência configurável
- **Monitoramento de status** em tempo real

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Angular 17** - Framework principal com componentes standalone
- **TypeScript** - Linguagem de programação
- **SCSS** - Pré-processador CSS com variáveis customizáveis
- **Material Symbols** - Biblioteca de ícones do Google Fonts
- **RxJS** - Programação reativa para gerenciamento de estado

### Design System
- **Tema Dark Mode** com variáveis CSS personalizadas
- **Glassmorphism** para efeitos visuais modernos
- **Design responsivo** para diferentes tamanhos de tela
- **Animações CSS** para transições suaves
- **Sistema de cores** consistente em todo o projeto

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** versão 18 ou superior
- **npm** ou **yarn** como gerenciador de pacotes
- **Git** para controle de versão

### Passo a Passo

#### 1. Clone o Repositório
```bash
git clone https://github.com/vncys/dashboard-spring-angular.git
cd dashboard-spring-angular
```

#### 2. Instale as Dependências
```bash
npm install
```

#### 3. Execute o Projeto
```bash
npm start
```

#### 4. Acesse no Navegador
Abra `http://localhost:4200` no seu navegador

### Comandos Disponíveis

```bash
# Desenvolvimento
npm start          # Inicia o servidor de desenvolvimento
npm run build     # Gera build de produção
npm run test      # Executa os testes unitários
npm run lint      # Verifica qualidade do código

# Produção
npm run build:prod    # Build otimizado para produção
npm run serve:prod    # Servidor de produção local
```

## 🧪 Como Testar o Sistema

### 1. **Teste de Navegação**
- Acesse a página inicial (`/home`)
- Navegue pelos botões de ação rápida
- Verifique se todas as rotas estão funcionando

### 2. **Teste de Autenticação**
- Clique em "Login" no cabeçalho
- Use qualquer email e senha (sistema simulado)
- Verifique se o redirecionamento para dashboard funciona
- Teste o logout e retorno à página inicial

### 3. **Teste do Dashboard**
- Acesse `/dashboard` após o login
- Verifique se as métricas estão sendo exibidas
- Teste os botões de ação rápida
- Navegue entre as diferentes seções

### 4. **Teste de Processos**
- Acesse `/processes` para listar processos
- Use o campo de busca para filtrar
- Teste a criação de novo processo (`/processes/new`)
- Edite um processo existente
- Verifique se o timer está funcionando

### 5. **Teste de Estatísticas**
- Acesse `/statistics` para visualizar gráficos
- Teste a mudança de período
- Verifique se os gráficos estão responsivos
- Teste a exportação de dados

### 6. **Teste de Configurações**
- Acesse `/settings` para configurar o sistema
- Altere algumas configurações
- Teste o salvamento e restauração
- Verifique se as mudanças são aplicadas

## 📱 Responsividade

O sistema foi desenvolvido com **design responsivo** e funciona em:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (até 767px)

### Teste de Responsividade
1. Redimensione a janela do navegador
2. Use as ferramentas de desenvolvedor (F12)
3. Teste em diferentes dispositivos
4. Verifique se os menus se adaptam

## 🔍 Estrutura do Projeto

```
angular-dashboard/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── auth/           # Autenticação (login/register)
│   │   │   ├── dashboard/      # Dashboard principal
│   │   │   ├── home/           # Página inicial
│   │   │   ├── process/        # Gerenciamento de processos
│   │   │   ├── settings/       # Configurações do sistema
│   │   │   └── statistics/     # Estatísticas e gráficos
│   │   ├── services/           # Serviços compartilhados
│   │   ├── app.component.ts    # Componente raiz
│   │   ├── app.routes.ts       # Configuração de rotas
│   │   └── app.config.ts       # Configuração da aplicação
│   ├── styles.scss             # Estilos globais
│   └── index.html              # HTML principal
├── package.json                 # Dependências e scripts
└── README.md                   # Este arquivo
```

## 🎨 Personalização

### Cores e Tema
As cores podem ser personalizadas editando as variáveis CSS em `src/styles.scss`:

```scss
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  // ... outras variáveis
}
```

### Componentes
- Todos os componentes são **standalone** (Angular 17)
- Podem ser facilmente modificados ou estendidos
- Seguem padrões de design consistentes

## 🐛 Solução de Problemas

### Erro de Compilação
```bash
# Limpe o cache e reinstale dependências
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Porta em Uso
```bash
# Use uma porta diferente
npm start -- --port 4201
```

### Problemas de Roteamento
- Verifique se todas as rotas estão definidas em `app.routes.ts`
- Confirme se os componentes estão sendo importados corretamente

## 📚 Recursos de Aprendizagem

### Angular
- [Documentação Oficial](https://angular.io/docs)
- [Angular CLI](https://cli.angular.io/)
- [Componentes Standalone](https://angular.io/guide/standalone-components)

### Design e UX
- [Material Design](https://material.io/design)
- [Google Fonts](https://fonts.google.com/)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte de uma atividade acadêmica.

## 👨‍💻 Desenvolvedor

**Vinicius** - Estudante de Sistemas de Informação

---

**Nota**: Este projeto demonstra a implementação de um dashboard administrativo completo usando Angular 17, com foco em boas práticas de desenvolvimento, design responsivo e experiência do usuário. 
# TCG API (Trading Card Game)

API RESTful desenvolvida para gerenciamento de um jogo de cartas colecionáveis (Trading Card Game - TCG). O projeto oferece funcionalidades para gerenciamento de usuários, cartas, decks e um sistema de ranking competitivo baseado em agregação de dados utilizando MongoDB.

---

## Tecnologias Utilizadas

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **Bcrypt**
* **MongoDB Aggregation Framework**
* **ES Modules (import/export)**

---

## Estrutura do Projeto

```text
src/
├── config/          # Configuração do banco de dados e variáveis de ambiente
├── controllers/     # Controladores responsáveis pelas requisições HTTP
├── models/          # Modelos e Schemas do Mongoose
├── routes/          # Definição das rotas da API
├── services/        # Regras de negócio e acesso ao banco de dados
└── index.js         # Ponto de entrada da aplicação
```

---

## Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd api_tcg
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Certifique-se de que o MongoDB esteja em execução na porta padrão (`27017`) ou altere a URI de conexão no arquivo:

```text
src/config/db.js
```

### 4. Inicie o servidor

```bash
node index.js
```

---

## Endpoints

| Método | Endpoint         | Descrição                              |
| ------ | ---------------- | -------------------------------------- |
| POST   | `/users`         | Cadastra um novo jogador               |
| POST   | `/users/login`   | Realiza autenticação do usuário        |
| POST   | `/cards`         | Adiciona uma nova carta ao jogo        |
| GET    | `/decks`         | Lista os decks com paginação           |
| GET    | `/users/ranking` | Retorna o ranking global dos jogadores |

---

## Funcionalidades

### Gerenciamento de Usuários

* Cadastro de jogadores
* Login de usuários
* Senhas criptografadas com **bcrypt**

### Gerenciamento de Cartas

* Cadastro de cartas
* Associação de cartas aos decks

### Gerenciamento de Decks

* Criação e listagem de decks
* Paginação nas consultas

### Ranking

* Ranking global de jogadores
* Cálculo utilizando o **Aggregation Framework** do MongoDB

---

## Recursos

* Arquitetura em camadas (Controllers, Services e Models)
* API RESTful
* Criptografia de senhas
* Proteção contra Mass Assignment
* Paginação em todas as rotas de listagem
* Consultas otimizadas com Aggregation Framework
* Código organizado e escalável

---

## Requisitos

* Node.js 18 ou superior
* MongoDB

---

## Executando o Projeto

```bash
npm install
node index.js
```

O servidor estará disponível em:

```text
http://localhost:3000
```

> Altere a porta conforme a configuração definida no projeto.

---

## Autor : PauloAndSS

Desenvolvido como projeto de API REST para gerenciamento de um Trading Card Game (TCG).

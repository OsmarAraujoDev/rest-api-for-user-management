
# REST API for User Management

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)

API REST para gestão de usuários com validação e integração com banco de dados MySQL usando Node.js, Express e Sequelize.

## Instalação

Clone o repositório e instale as dependências:

```sh
git clone https://github.com/OsmarAraujoDev/rest-api-for-user-management.git
cd rest-api-for-user-management
npm install
```

Crie um arquivo `.env` baseado em `.env.example` e configure as variáveis de ambiente.

## Uso

### Inicialização

Inicie o servidor com:

```sh
node server.js
```

O servidor estará disponível em `http://localhost:3000` (ou conforme configurado no `.env`).

### Endpoints

#### Criar Usuário

```http
POST /api/users
```

**Body:**
```json
{
  "nickname": "Nome",
  "email": "email@exemplo.com",
  "phone": "5511999999999",
  "password": "SenhaForte123"
}
```

#### Listar Usuários

```http
GET /api/users
```
**Query params opcionais:** `limit`, `offset`, `sort_by`, `sort_order`, `id`, `nickname`, `email`, `phone`

#### Buscar Usuário por ID

```http
GET /api/users/:id
```

#### Atualizar Usuário

```http
PUT /api/users/:id
```

**Body:** (campos opcionais)
```json
{
  "nickname": "NovoNome",
  "email": "novo@email.com",
  "phone": "5511988888888",
  "password": "NovaSenha123"
}
```

#### Deletar Usuário

```http
DELETE /api/users/:id
```

### Validação

Todos os endpoints utilizam validação de dados com [Joi](https://joi.dev/). Erros de validação retornam status 400 com mensagem detalhada.

### Exemplo de Resposta

```json
{
  "ok": true,
  "message": "users found",
  "data": [
    {
      "id": 1,
      "nickname": "Nome",
      "email": "email@exemplo.com",
      "phone": "5511999999999",
      "created_at": "2024-06-01T12:00:00.000Z"
    }
  ]
}
```

## Estrutura do Projeto

- [`app.js`](app.js): Configuração principal do Express.
- [`server.js`](server.js): Inicialização do servidor e conexão com o banco.
- [`config/`](config/): Configurações de ambiente e banco de dados.
- [`models/User.js`](models/User.js): Definição do modelo de usuário (Sequelize).
- [`controllers/user.controller.js`](controllers/user.controller.js): Lógica dos endpoints de usuário.
- [`services/user.service.js`](services/user.service.js): Regras de negócio para usuários.
- [`routes/user.routes.js`](routes/user.routes.js): Rotas de usuário.
- [`middlewares/validate.js`](middlewares/validate.js): Middleware de validação.
- [`validations/user.validations.js`](validations/user.validations.js): Schemas de validação Joi.
- [`utils/createError.js`](utils/createError.js): Utilitário para erros customizados.

## Contribuição

Sinta-se à vontade para abrir issues ou pull requests para melhorias, correções ou sugestões.

## Contato

- Email: osmar.araujo.dev@gmail.com  
- GitHub: [OsmarAraujoDev](https://github.com/OsmarAraujoDev)  
- LinkedIn: [Osmar Araujo](www.linkedin.com/in/osmar-araujo-a88bb1396)

## Licença

Distribuído sob a licença GPLv3. Veja [LICENSE](LICENSE) para mais detalhes.
```
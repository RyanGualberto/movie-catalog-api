# Movie Catalog API

## Introdução

Bem-vindo ao Movie Catalog API! Esta é uma aplicação Node.js desenvolvida usando o framework Nest.js, que fornece uma API RESTful para gerenciar um catálogo de filmes. A autenticação é baseada em JSON Web Tokens (JWT), e o sistema utiliza PostgreSQL como banco de dados principal e Redis para caching.

## Requisitos

Para executar esta aplicação localmente, certifique-se de ter as seguintes ferramentas instaladas:

- Nest.js
- TypeORM
- Docker
- PostgreSQL
- Redis

## Configuração do Ambiente

1. Clone este repositório:

   ```bash
   git clone https://github.com/ryangualberto/movie-catalog-api.git
   cd movie-catalog-api
   ```

3. Configure as variáveis de ambiente no arquivo `.env`. Um exemplo está disponível em `env-model.txt`.

4. Inicie os serviços Docker:

   ```bash
   docker-compose up -d
   ```

A aplicação estará disponível em `http://localhost:3000`.

## Documentação da API

Acesse a documentação da API utilizando o Swagger:

- [Swagger Documentation](http://54.90.209.69:3000/api)

## Funcionalidades

1. **Autenticação JWT:** Acesse os endpoints protegidos através da autenticação JWT.

2. **CRUD do Catálogo de Filmes:** Gerencie o catálogo de filmes com operações CRUD.

## Contribuição

Se deseja contribuir para este projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para a sua contribuição: `git checkout -b feature/sua-feature`.
3. Commit suas alterações: `git commit -m 'Adiciona nova funcionalidade'`.
4. Faça o push para a branch: `git push origin feature/sua-feature`.
5. Abra um Pull Request.

## Autor

**Ryan Gualberto**
- LinkedIn: [Ryan Gualberto](https://www.linkedin.com/in/ryan-gualberto)
- GitHub: [seu-usuario](https://github.com/ryangualberto)

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.
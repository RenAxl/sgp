# SGP

Frontend React e backend Spring Boot publicados separadamente no Heroku.

| Componente | Aplicativo Heroku | Buildpack | URL |
| --- | --- | --- | --- |
| Frontend | `sgp-redatha-frontend` | `heroku/nodejs` | https://sgp-redatha-frontend-0439497bd787.herokuapp.com |
| Backend | `sgp-redatha` | `heroku/java` | https://sgp-redatha-14a7b863989e.herokuapp.com |

Os dois aplicativos usam **Deployment method: GitHub**, conectados ao repositório
https://github.com/RenAxl/sgp e à branch `master`.

## Como a publicação funciona

O `pom.xml` da raiz direciona o build Java para `backend`. O `package.json` da
raiz instala as dependências e compila `frontend`; o pacote `serve` entrega
os arquivos gerados e permite abrir as rotas do React diretamente.
O `Procfile` executa `bin/heroku-start`, que escolhe o processo pela variável
`SGP_COMPONENT` de cada aplicativo. O frontend não é incluído no JAR do backend.

Node 14.21.3 e npm 6.14.18 preservam a compatibilidade com o `node-sass 4.14.1`
existente. Java 11 é selecionado pelo `system.properties` da raiz.

## Configurações no Heroku

Backend:

- `SGP_COMPONENT=backend` e `SPRING_PROFILES_ACTIVE=prod`.
- `FRONTEND_URL` contém a origem HTTPS do frontend permitida pelo CORS.
- `DATABASE_URL` vem do vínculo com o PostgreSQL existente. O buildpack Java
  gera as variáveis JDBC e Spring de conexão dinamicamente.
- `CLIENT_ID`, `CLIENT_SECRET`, `JWT_SECRET` e `JWT_DURATION` configuram a autenticação.

Frontend:

- `SGP_COMPONENT=frontend`.
- `REACT_APP_BACKEND_URL` contém a URL HTTPS do backend e é incorporada ao build.
  Após alterar essa variável, execute um novo deploy do frontend na aba Deploy.

As credenciais ficam no Heroku, fora do repositório.

## Recursos e banco

Cada aplicativo executa um dyno **Eco**, dentro da assinatura já existente.
As 1.000 horas mensais são compartilhadas com os demais aplicativos Eco da conta,
incluindo a Locadora. Aplicativos Eco dormem após 30 minutos sem tráfego.

O backend usa o recurso PostgreSQL já contratado
`postgresql-perpendicular-83634`, plano **Essential-0**, no schema `sgp`.
A Locadora mantém seu schema `locadora_rdt`. Não é necessário criar outro
add-on PostgreSQL nem mudar de plano. O SGP usa até quatro conexões.

O perfil de produção apenas valida a estrutura existente: não recria tabelas
nem carrega os usuários de teste. Os dados preservados no schema `sgp` são mantidos.
O administrador inicial usa `renandt30@gmail.com`; a senha gerada foi salva
localmente em `~/.config/sgp/heroku-admin.json` e não é versionada.

## Desenvolvimento e verificação

Para executar o frontend em Docker, consulte [frontend/README.md](frontend/README.md).
Ele usa `http://localhost:8080` como API local por padrão.

Para compilar o backend e executar seus testes, na raiz do repositório:

```bash
mvn clean verify
```

Para consultar os recursos sem alterá-los:

```bash
heroku ps:type --app sgp-redatha
heroku ps:type --app sgp-redatha-frontend
heroku addons --app sgp-redatha
```

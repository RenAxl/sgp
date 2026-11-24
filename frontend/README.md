# SGP — Frontend

Frontend React executado em um container de desenvolvimento com **Node 14.21.3**
e **npm 6.14.18**, versões compatíveis com o `node-sass 4.14.1` e com o
`package-lock.json` do projeto. Não é necessário instalar Node ou npm na máquina:
basta Docker com o plugin Docker Compose.

## Executar

Na pasta `frontend`:

```bash
docker compose up -d --build
```

Acesse **http://localhost:3000**. Para acompanhar a compilação:

```bash
docker compose logs -f frontend
```

As alterações em `src` e `public` aparecem automaticamente no navegador.
As dependências ficam dentro da imagem, sem usar o `node_modules` da máquina.
Após alterar dependências ou outros arquivos de configuração, execute novamente
`docker compose up -d --build`.

Para parar e remover o container:

```bash
docker compose down
```

## Backend e porta

Por padrão, o frontend acessa a API em `http://localhost:8080`.
O backend deve estar em execução separadamente. Como as requisições são feitas
pelo navegador, a URL precisa ser acessível pela máquina que abre o frontend.

Para usar outra API ou porta, informe as variáveis ao iniciar o serviço:

```bash
REACT_APP_BACKEND_URL=http://localhost:8081 FRONTEND_PORT=3001 docker compose up -d --build
```

Também é possível definir essas variáveis em um arquivo `.env` nesta pasta.

## Dependências e build

Use npm e mantenha `package-lock.json` sincronizado com `package.json`.
O Docker usa `npm ci` para instalar exatamente as versões registradas no lockfile;
o `yarn.lock` antigo não é utilizado.

Para verificar a compilação de produção:

```bash
docker compose run --rm --no-deps frontend npm run build
```

Esse comando gera o build no container temporário. Para copiá-lo para a máquina
com o serviço em execução:

```bash
docker compose exec frontend npm run build
docker compose cp frontend:/app/build ./build
```

O ambiente Docker foi preparado para desenvolvimento e preserva as versões
legadas exigidas pelas dependências atuais do projeto.

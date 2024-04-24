### Criar o conteiner da aplicação

```docker build -t webacademy/webacademy-nginx:v1 .```

### rodar o conteiner mapeando a porta para 3000

```docker run -d --name webacademy-nginx -p 3000:7000 webacademy/webacademy-nginx:v1```
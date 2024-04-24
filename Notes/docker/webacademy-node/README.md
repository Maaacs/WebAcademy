### Criar o conteiner da aplicação

```docker build -t webacademy/webacademy-node .```

### rodar o conteiner mapeando a porta para 3000

```docker run -d --name webacademy-node -p 4567:4567 webacademy/webacademy-node```

### terminal

```docker exec -it webacademy-node /bin/bash```
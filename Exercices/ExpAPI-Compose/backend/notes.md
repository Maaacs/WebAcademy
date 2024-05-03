
## Cria a imagem
```docker build -t backend_loja .```

## Cria um volume dentro do container
```docker run -v /home/max/WebAcademy/Exercices/ExpAPI/backend/src:/app/src -p4466:466 -d backend_loja```
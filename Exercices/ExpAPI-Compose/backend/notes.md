
## Cria a imagem
```docker build -t backend_loja .```

## Cria um volume dentro do container
```docker run -v /home/max/WebAcademy/Exercices/ExpAPI/backend/src:/app/src -p4466:466 -d backend_loja```

## Criar as seeds
```docker exec backend_loja npx prisma db seed```

## Subir nova migration pro container
```docker exec backend_loja npx prisma migrate dev --name [nome_migration]```


## Gerar documentação swagger
```npm run swagger```

## Acessar documentação das APIs com swagger
```http://localhost:4466/api```
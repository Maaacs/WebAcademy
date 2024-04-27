## Criar os containers com o dockerfile
No terminal do diretório rodar:
docker build -t webacademy-redes .


## Para fazer os dois conteiners se comunicarem:

OPÇÃO 1
- pegar o ip do container 2
    1. docker run -d --name webacademy-redes-1 webacademy-redes
    2. docker run -d --name webacademy-redes-2 webacademy-redes
    3. docker inspect webacademy-redes-2
    4. docker exec -it webacademy-redes-1 /bin/bash (acessar container 1)
    5. ping [IP container 2] (para verificar os pacotes sendo enviados)
- Desvantagens: ip dos containers sempre mudam, então essa conexão eventualmente falhará. A solução é criar a conexão via DNS.

#
OPÇÃO 2
- criar túnel de rede (DNS)
    1. docker network create -d brigde rede_webacademy 
    2. docker network ls
    3. docker run -d --name webacademy-redes-1 --network rede_webacademy webacademy-redes
    4. docker run -d --name webacademy-redes-2 --network rede_webacademy webacademy-redes
    5. docker exec -it webacademy-redes-1 /bin/bash (acessar container 1)
        - rodar ping webacademy-redes-2

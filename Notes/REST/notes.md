## Step by step


### how to initialize typescript project

`npm inity -y`

`npm install express`

`npm install -D typescript "@types/node" "@types/express" ts-node`

`tsc --init`

### prisma
`npm install -D prisma`
`npm install @prisma/client`
`npx prisma init --datasource-provider mysql`
`npx prisma migrate dev --name init`
`npx prisma migrate dev --name create-produto-table`

### docker
`mysql --host=127.0.0.1 --port=3307 -u root -p`
import { PrismaClient } from '@prisma/client'
import { TiposUsuarios } from '../src/resources/tipoUsuario/tipoUsuario.constants'

const prisma = new PrismaClient()

const seed = async () => {
    await prisma.tipoUsuario.createMany({
        data: [
            {
                id: TiposUsuarios.ADMIN,
                rotulo: 'admin',
            },
            {
                id: TiposUsuarios.CLIENT,
                rotulo: 'client',
            },
        ] })
}


seed()
.then(() =>{
    prisma.$disconnect();
})
.catch((error) => {
    console.error(error);
    prisma.$disconnect();
});
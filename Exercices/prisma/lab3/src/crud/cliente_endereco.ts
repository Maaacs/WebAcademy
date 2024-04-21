import { PrismaClient } from '@prisma/client';
import faker from 'faker';

const prisma = new PrismaClient();


async function createRandomClienteEndereco() {
    const nome = faker.name.findName(); 
    const email = faker.internet.email(); 
    const cpf = faker.datatype.number({ min: 10000000000, max: 99999999999 }).toString(); 
    const cep = faker.address.zipCode('#####-###'); 
    const dataNascimento = faker.date.between('1960-01-01', '2000-12-31'); 
    const logradouro = faker.address.streetName(); 
    const numero = faker.datatype.number({ min: 1, max: 10000 }); 
    const complemento = faker.random.arrayElement(['Apto', 'Casa', null]); 
    const cidade = faker.address.cityName(); 
    const estado = faker.address.stateAbbr(); 
  
    const cliente = await prisma.cliente.create({
        data: {
            nome_completo: nome,
            email: email,
            cpf: cpf,
            celular: faker.phone.phoneNumber('###########'),
            data_nascimento: dataNascimento,
            enderecos: {
                create: {
                    logradouro: logradouro,
                    numero: numero,
                    complemento: complemento,
                    cidade: cidade,
                    estado: estado,
                    cep: cep
                }
            }
        },
        include: {
            enderecos: true
        }
    });
  
    console.log('Cliente e Endereço Criados:', JSON.stringify(cliente, null, 2));
  }

async function readClientesEnderecos() {
  const clientes = await prisma.cliente.findMany({
    include: { enderecos: true }, 
  });

  if (clientes.length === 0) {
    console.log('Nenhum cliente encontrado!');
  } else {
    console.log('Clientes e Endereços:', clientes);
  }
}


async function updateEndereco(idCliente: number, idEndereco: number, novoLogradouro: string) {
  const clienteExiste = await prisma.cliente.findUnique({
      where: { id_cliente: idCliente }
  });
  if (!clienteExiste) {
      console.log('Cliente não encontrado!');
      return;
  }
  const enderecoExiste = await prisma.endereco.findFirst({
      where: {
          id_endereco: idEndereco,
          id_cliente: idCliente  
      }
  });
  if (!enderecoExiste) {
      console.log('Endereço não encontrado ou não pertence ao cliente especificado!');
      return;
  }
  // Se ambos existirem, proceder com a atualização
  const enderecoAtualizado = await prisma.endereco.update({
      where: {
          id_endereco: idEndereco
      },
      data: {
          logradouro: novoLogradouro
      },
  });

  console.log('Endereço atualizado:', enderecoAtualizado);
}



async function deleteCliente(idCliente: number) {
  const clienteExiste = await prisma.cliente.findUnique({
      where: { id_cliente: idCliente }
  });

  if (!clienteExiste) {
      console.log('Cliente não encontrado!');
      return;
  }

  const resultado = await prisma.$transaction(async (prisma) => {
      await prisma.endereco.deleteMany({
          where: { id_cliente: idCliente }
      });

      return prisma.cliente.delete({
          where: { id_cliente: idCliente }
      });
  });

  console.log('Cliente e endereços deletados:', resultado);
}




createRandomClienteEndereco();
//updateEndereco(1, 3, 'Rua B'); 
//deleteCliente(2);
//readClientesEnderecos();
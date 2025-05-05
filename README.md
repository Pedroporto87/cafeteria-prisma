# API de Gestão de Pedidos de Cafeteria - Utilizando Prisma

## Descrição

Uma API que simula a gestão de pedidos de uma cafeteria, permitindo criar, listar, atualizar e deletar pedidos.

## Requisitos

Node.js v14 ou superior
Sqlite (ou outro banco suportado pelo Prisma se configurado)

## Instalação e Configuração

Clone o repositório:
   ```sh
   git clone https://github.com/Pedroporto87/cafeteria-prisma.git

   Instale as dependencias
   npm init

   Execute as migrações do banco de dados:
   npm run migrate

   Gere o cliente Prisma:
   npm run generate

   Entre no diretorio
   cd src

   Rode o servidor
   npm run dev

## Endpoints da API

POST /api/pedidos - Criar um novo pedido
    tipos de item: cappuccino, expresso, coado, frappé, especiais
    exemplo: 
    {
        "cliente": "João",
        "item": "cappuccino",
        "quantidade": 2,
        "observacoes": "Sem açúcar",
        "status": "Em preparo"
    }

GET /api/pedidos - Listar todos os pedidos

PUT /api/pedidos/:id - Atualizar status de um pedido, substituindo o :id pelo numero do id que se deseja
Request body: { "status": "Pronto" }

GET /api/pedidos/status/:status - Buscar pedidos por status, substituindo pelos valores (EmPreparo, Pronto, Entregue, Cancelado)

DELETE /api/pedidos/:id - Deletar um pedido, substituindo o :id pelo numero do id que se deseja
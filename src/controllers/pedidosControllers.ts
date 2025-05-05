import { StatusType, ItemType } from '@prisma/client';
import prisma from '../models/prisma';
import { Request, Response } from 'express';

interface Pedido {
  cliente: string;
  quantidade: number;
  item: ItemType;
  observacoes?: string;
  status: StatusType;
}

export const postPedidos = async (req: Request, res: Response) => {
    const { cliente, quantidade, item, observacoes, status } = req.body;

try {
    const pedido = await prisma.pedido.create({
        data: {
            cliente,
            item,
            quantidade,
            observacoes,
            status: status || 'EmPreparo',
        }
    })
    res.status(201).json(pedido);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar pedido', details: (error as any).message });
    }
}

export const getPedidos = async (req: Request, res: Response) => {
    try {
        const pedidos = await prisma.pedido.findMany()
        return res.json(pedidos);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao listar pedido', details: (error as any).message });
    }
}

export const updatePedido = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body; // Aqui você pode validar se o status é válido anteriormente
    const validStatuses = ['EmPreparo', 'Pronto', 'Entregue', 'Cancelado'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Status inválido. Valores válidos: ${validStatuses.join(', ')}` });
    }
    try {
      const pedidoAtualizado = await prisma.pedido.update({
        where: { id: parseInt(id) },
        data: { status },
      });
      return res.json(pedidoAtualizado);
    } catch (error) {
      if ((error as any) === 'P2025') { // Prisma erro se registro não encontrado
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }
      return res.status(500).json({ error: 'Erro ao atualizar pedido', details: (error as any).message });
    }
  };

  export const getPedidosByStatus = async (req: Request, res: Response) => {
    const { status } = req.params;
    const validStatuses = ['EmPreparo', 'Pronto', 'Entregue', 'Cancelado'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Status inválido. Valores válidos: ${validStatuses.join(', ')}` });
    }
    try {
      const pedidos = await prisma.pedido.findMany({ where: { status: status as StatusType } });
      return res.json(pedidos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar pedidos por status', details: (error as any).message });
    }
  };

  export const deletePedido = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.pedido.delete({ where: { id: parseInt(id) } });
      return res.json({ message: 'Pedido deletado com sucesso' });
    } catch (error) {
      if ((error as any).code === 'P2025') { // Prisma erro se registro não encontrado
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }
      return res.status(500).json({ error: 'Erro ao deletar pedido', details: (error as any).message });
    }
  };
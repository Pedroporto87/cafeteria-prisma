import express from 'express'
import { asyncHandler } from '../middleware/asyncHandler'
import { postPedidos, getPedidos, updatePedido, getPedidosByStatus, deletePedido} from '../controllers/pedidosControllers'

const router = express.Router()

router.post('/pedidos', asyncHandler(postPedidos))
router.get('/pedidos', asyncHandler(getPedidos))
router.put('/pedidos/:id', asyncHandler(updatePedido))
router.get('/pedidos/:status', asyncHandler(getPedidosByStatus))
router.delete('/pedidos/:id', asyncHandler(deletePedido))

export default router
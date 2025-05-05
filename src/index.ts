import express from 'express';
import pedidosRoutes from './routes/pedidosRoutes';



const app = express();

app.use(express.json());

// Todas as rotas ficarão sob /api
app.use('/api', pedidosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
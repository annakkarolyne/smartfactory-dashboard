import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import machinesRouter, { getMachines } from './routes/machines';
import alertsRouter from './routes/alerts';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

app.use('/api/machines', machinesRouter);
app.use('/api/alerts', alertsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'SmartFactory API rodando! 🚀' });
});

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
  socket.emit('machines:update', getMachines());
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Simula mudanças nas máquinas a cada 3 segundos
setInterval(() => {
  const machines = getMachines();
  const updated = machines.map(m => ({
    ...m,
    production: m.status === 'operando'
      ? Math.min(100, Math.max(50, m.production + Math.floor(Math.random() * 11) - 5))
      : m.production,
    temperature: m.status === 'operando'
      ? Math.min(80, Math.max(30, m.temperature + Math.floor(Math.random() * 7) - 3))
      : m.temperature,
  }));
  io.emit('machines:update', updated);
}, 3000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
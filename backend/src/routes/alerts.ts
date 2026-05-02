import { Router, Request, Response } from 'express';

const router = Router();

let alerts = [
  { id: 1, machineId: 4, machine: 'Robô de Solda 04', type: 'falha', message: 'Temperatura crítica detectada', createdAt: new Date().toISOString() },
  { id: 2, machineId: 2, machine: 'Fresadora 02', type: 'manutenção', message: 'Manutenção preventiva necessária', createdAt: new Date().toISOString() },
  { id: 3, machineId: 1, machine: 'Torno CNC 01', type: 'aviso', message: 'Produção abaixo do esperado', createdAt: new Date().toISOString() },
];

router.get('/', (req: Request, res: Response) => {
  res.json(alerts);
});

router.post('/', (req: Request, res: Response) => {
  const newAlert = { id: alerts.length + 1, createdAt: new Date().toISOString(), ...req.body };
  alerts.push(newAlert);
  res.status(201).json(newAlert);
});

router.delete('/:id', (req: Request, res: Response) => {
  alerts = alerts.filter(a => a.id !== Number(req.params.id));
  res.json({ message: 'Alerta removido com sucesso' });
});

export default router;
import { Router, Request, Response } from 'express';

const router = Router();

let machines = [
  { id: 1, name: 'Torno CNC 01', status: 'operando', production: 87, temperature: 42 },
  { id: 2, name: 'Fresadora 02', status: 'manutenção', production: 0, temperature: 25 },
  { id: 3, name: 'Prensa Hidráulica 03', status: 'operando', production: 95, temperature: 38 },
  { id: 4, name: 'Robô de Solda 04', status: 'falha', production: 0, temperature: 67 },
  { id: 5, name: 'Esteira de Montagem 05', status: 'operando', production: 72, temperature: 31 },
];

// Função exportada para o WebSocket usar
export const getMachines = () => machines;

router.get('/', (req: Request, res: Response) => {
  res.json(machines);
});

router.get('/:id', (req: Request, res: Response) => {
  const machine = machines.find(m => m.id === Number(req.params.id));
  if (!machine) return res.status(404).json({ message: 'Máquina não encontrada' });
  res.json(machine);
});

router.post('/', (req: Request, res: Response) => {
  const newMachine = { id: machines.length + 1, ...req.body };
  machines.push(newMachine);
  res.status(201).json(newMachine);
});

router.put('/:id', (req: Request, res: Response) => {
  const index = machines.findIndex(m => m.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Máquina não encontrada' });
  machines[index] = { ...machines[index], ...req.body };
  res.json(machines[index]);
});

router.delete('/:id', (req: Request, res: Response) => {
  machines = machines.filter(m => m.id !== Number(req.params.id));
  res.json({ message: 'Máquina removida com sucesso' });
});

export default router;
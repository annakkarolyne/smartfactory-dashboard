# ⚙️ SmartFactory Dashboard

Sistema de monitoramento industrial em tempo real, inspirado nas soluções de Indústria 4.0 

![SmartFactory Dashboard](https://img.shields.io/badge/Status-Online-00ff88?style=for-the-badge)
![React](https://img.shields.io/badge/React-TypeScript-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Socket.io](https://img.shields.io/badge/Socket.io-Tempo_Real-010101?style=for-the-badge&logo=socket.io)

## 🔗 Demo ao vivo
**[https://smartfactory-dashboard-liard.vercel.app](https://smartfactory-dashboard-liard.vercel.app)**

## 📌 Sobre o projeto

O SmartFactory Dashboard simula um sistema real de monitoramento de máquinas industriais. O operador consegue visualizar em tempo real o status de cada máquina, índice de produção, temperatura e alertas críticos — sem precisar recarregar a página.

Esse tipo de sistema é usado em fábricas modernas para aumentar a eficiência e reduzir tempo de parada das máquinas.

## ✨ Funcionalidades

- 📊 Dashboard com atualização automática a cada 3 segundos via WebSocket
- 🏭 Monitoramento de 5 máquinas industriais em tempo real
- 🌡️ Indicador de temperatura com alerta visual quando crítica
- 📈 Barras de produção animadas por 

- 🔴 Log de alertas com severidade (crítico, aviso, informativo)
- 🔍 Filtro por status (operando, falha, manutenção)
- 📱 Responsivo — funciona no celular e no desktop
- 🔌 Indicador de conexão WebSocket (ONLINE/OFFLINE)

## 🛠️ Tecnologias utilizadas

### Backend
- Node.js + Express
- TypeScript
- Socket.io (WebSocket)
- Nodemon (hot reload)

### Frontend
- React + TypeScript
- Socket.io Client
- Axios
- CSS-in-JS (inline styles)

### Deploy
- Backend: [Render](https://render.com)
- Frontend: [Vercel](https://vercel.com)

## 🚀 Como rodar localmente

smartfactory-dashboard/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── machines.ts
│   │   │   └── alerts.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
└── frontend/
├── src/
│   ├── App.tsx
│   └── index.css
└── package.json

## 💡 Arquitetura

O frontend conecta ao backend via **WebSocket (Socket.io)**. O servidor emite o evento `machines:update` a cada 3 segundos com os dados atualizados das máquinas. O React escuta esse evento e atualiza a tela automaticamente sem recarregar a página.
Frontend (React) ←→ WebSocket ←→ Backend (Node.js)
↕
Dados em tempo real
## 👨‍💻 Desenvolvido por

Anna Karolyne — [GitHub](https://github.com/annakkarolyne)
```bash

# Clone o repositório
git clone https://github.com/annakkarolyne/smartfactory-dashboard.git
cd smartfactory-dashboard

# Instale e rode o backend
cd backend
npm install
npm run dev

# Em outro terminal, instale e rode o frontend
cd frontend
npm install
npm start
```

Acesse `http://localhost:3001` no navegador.

## 📁 Estrutura do projeto

```
smartfactory-dashboard/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── machines.ts
│   │   │   └── alerts.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── App.tsx
    │   └── index.css
    └── package.json
```

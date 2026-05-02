import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = 'https://smartfactory-dashboard.onrender.com';

interface Machine {
  id: number;
  name: string;
  status: string;
  production: number;
  temperature: number;
}

interface Alert {
  id: number;
  machine: string;
  type: string;
  message: string;
}

function LandingPage({ onEnter }: { onEnter: () => void }) {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const counter = setInterval(() => setCount(p => p < 100 ? p + 1 : 100), 20);
    const dotsInterval = setInterval(() => setDots(p => p.length >= 3 ? '' : p + '.'), 500);
    return () => { clearInterval(counter); clearInterval(dotsInterval); };
  }, []);

  return (
    <div className="scanline" style={{ minHeight: '100vh', background: '#000913', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,200,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div style={{ position: 'absolute', width: '900px', height: '900px', background: 'radial-gradient(circle, rgba(0,100,255,0.12) 0%, transparent 65%)', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      <div style={{ position: 'absolute', top: '15%', left: '4%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {['SYS.ONLINE', 'NET.ACTIVE', 'SEC.CLEAR'].map((t, i) => (
          <div key={i} style={{ fontSize: '10px', color: 'rgba(0,255,136,0.3)', letterSpacing: '2px', fontFamily: 'monospace' }}>{t}</div>
        ))}
      </div>
      <div style={{ position: 'absolute', top: '15%', right: '4%', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
        {['IND.4.0', 'IOT.RDY', 'AI.PROC'].map((t, i) => (
          <div key={i} style={{ fontSize: '10px', color: 'rgba(0,150,255,0.3)', letterSpacing: '2px', fontFamily: 'monospace' }}>{t}</div>
        ))}
      </div>
      <div style={{ textAlign: 'center', zIndex: 1, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 1.2s ease' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,150,255,0.08)', border: '1px solid rgba(0,150,255,0.25)', borderRadius: '20px', padding: '6px 18px', fontSize: '10px', color: '#00aaff', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '32px', fontFamily: 'monospace' }}>
          <div className="pulse-green" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff88' }} />
          INDÚSTRIA 4.0 · MONITORAMENTO EM TEMPO REAL
        </div>
        <div className="flicker">
          <h1 style={{ fontSize: '76px', fontWeight: '800', margin: '0 0 4px', background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 50%, #00ccff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.05, letterSpacing: '-3px' }}>SmartFactory</h1>
          <h2 style={{ fontSize: '76px', fontWeight: '800', margin: '0 0 32px', background: 'linear-gradient(135deg, #0066ff 0%, #00ddff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.05, letterSpacing: '-3px' }}>Dashboard</h2>
        </div>
        <p style={{ color: '#3d5a7a', fontSize: '16px', maxWidth: '460px', lineHeight: 1.7, margin: '0 auto 48px', fontFamily: 'monospace' }}>
          Sistema de monitoramento industrial com dados em tempo real, alertas inteligentes e análise de produção.
        </p>
        <div style={{ width: '320px', margin: '0 auto 36px', fontFamily: 'monospace' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#2d4a6a', marginBottom: '8px', letterSpacing: '2px' }}>
            <span>INICIALIZANDO SISTEMA{dots}</span>
            <span style={{ color: count === 100 ? '#00ff88' : '#00aaff' }}>{count}%</span>
          </div>
          <div style={{ height: '2px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px' }}>
            <div style={{ width: `${count}%`, height: '100%', background: count === 100 ? 'linear-gradient(90deg, #00ff88, #00ffcc)' : 'linear-gradient(90deg, #0044ff, #00ddff)', borderRadius: '2px', boxShadow: '0 0 12px rgba(0,150,255,0.8)', transition: 'width 0.1s linear' }} />
          </div>
        </div>
        <button onClick={onEnter} disabled={count < 100} style={{ background: count === 100 ? 'linear-gradient(135deg, #0044dd, #00aaff)' : 'rgba(255,255,255,0.03)', border: count === 100 ? 'none' : '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', padding: '16px 56px', fontSize: '13px', fontWeight: '700', color: count === 100 ? '#fff' : '#2d4a6a', cursor: count === 100 ? 'pointer' : 'not-allowed', letterSpacing: '3px', textTransform: 'uppercase', boxShadow: count === 100 ? '0 0 40px rgba(0,150,255,0.35)' : 'none', transition: 'all 0.5s ease', fontFamily: 'monospace' }}>
          {count < 100 ? `CARREGANDO ${count}%` : 'ACESSAR SISTEMA →'}
        </button>
        <div style={{ display: 'flex', gap: '64px', justifyContent: 'center', marginTop: '72px' }}>
          {[{ value: '5', label: 'MÁQUINAS' }, { value: '99%', label: 'UPTIME' }, { value: '24/7', label: 'MONITORAMENTO' }].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '32px', fontWeight: '800', color: '#00aaff', margin: '0 0 6px', fontFamily: 'monospace', textShadow: '0 0 20px rgba(0,150,255,0.6)' }}>{s.value}</p>
              <p style={{ fontSize: '10px', color: '#1e3a5a', margin: 0, letterSpacing: '3px', fontFamily: 'monospace' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onBack }: { onBack: () => void }) {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<string>('todos');
  const [time, setTime] = useState(new Date());
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const socket = io(API_URL, {
      transports: ['websocket', 'polling'],
    });

    axios.get(`${API_URL}/api/alerts`).then(res => setAlerts(res.data));

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('machines:update', (data: Machine[]) => {
      setMachines(data);
      setLastUpdate(new Date());
    });

    const clock = setInterval(() => setTime(new Date()), 1000);

    return () => {
      socket.off('machines:update');
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
      clearInterval(clock);
    };
  }, []);

  const filtered = filter === 'todos' ? machines : machines.filter(m => m.status === filter);
  const operando = machines.filter(m => m.status === 'operando').length;
  const falha = machines.filter(m => m.status === 'falha').length;
  const manutencao = machines.filter(m => m.status === 'manutenção').length;
  const mediaProducao = machines.length > 0 ? Math.round(machines.reduce((a, m) => a + m.production, 0) / machines.length) : 0;

  const statusColor = (s: string) => s === 'operando' ? '#00ff88' : s === 'falha' ? '#ff3355' : '#ffaa00';
  const tempColor = (t: number) => t >= 60 ? '#ff3355' : t >= 45 ? '#ffaa00' : '#00aaff';

  return (
    <div className="scanline" style={{ minHeight: '100vh', background: '#000913', color: '#e2e8f0', fontFamily: 'Inter, sans-serif', padding: '16px', backgroundImage: 'linear-gradient(rgba(0,200,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(0,150,255,0.15)', borderRadius: '8px', padding: '12px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={onBack} style={{ background: 'rgba(0,150,255,0.08)', border: '1px solid rgba(0,150,255,0.2)', borderRadius: '4px', padding: '5px 12px', color: '#00aaff', cursor: 'pointer', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '1px' }}>← VOLTAR</button>
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: '700', color: '#00aaff', margin: 0, letterSpacing: '2px', fontFamily: 'monospace', textShadow: '0 0 20px rgba(0,150,255,0.5)' }}>⚙ SMARTFACTORY DASHBOARD</h1>
            <p style={{ color: '#1e3a5a', margin: 0, fontSize: '10px', letterSpacing: '2px', fontFamily: 'monospace' }}>MONITORAMENTO INDUSTRIAL · TEMPO REAL</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {lastUpdate && <span style={{ color: '#1e3a5a', fontSize: '10px', fontFamily: 'monospace' }}>UPD: {lastUpdate.toLocaleTimeString()}</span>}
          <span style={{ color: '#1e3a5a', fontSize: '13px', fontFamily: 'monospace' }}>{time.toLocaleTimeString()}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div className={connected ? 'pulse-green' : ''} style={{ width: '7px', height: '7px', borderRadius: '50%', background: connected ? '#00ff88' : '#ff3355' }} />
            <span style={{ color: connected ? '#00ff88' : '#ff3355', fontSize: '10px', letterSpacing: '2px', fontFamily: 'monospace' }}>{connected ? 'ONLINE' : 'OFFLINE'}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {[
          { label: 'OPERANDO', value: operando, color: '#00ff88', pulse: 'pulse-green' },
          { label: 'EM FALHA', value: falha, color: '#ff3355', pulse: falha > 0 ? 'pulse-red' : '' },
          { label: 'MANUTENÇÃO', value: manutencao, color: '#ffaa00', pulse: '' },
          { label: 'PRODUÇÃO MÉDIA', value: `${mediaProducao}%`, color: '#00aaff', pulse: '' },
        ].map((card, i) => (
          <div key={i} style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${card.color}20`, borderRadius: '8px', padding: '16px 18px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`, boxShadow: `0 0 8px ${card.color}` }} />
            <p style={{ color: '#1e3a5a', fontSize: '9px', margin: '0 0 10px', letterSpacing: '2px', fontFamily: 'monospace' }}>{card.label}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {card.pulse && <div className={card.pulse} style={{ width: '8px', height: '8px', borderRadius: '50%', background: card.color, flexShrink: 0 }} />}
              <p style={{ fontSize: '42px', fontWeight: '800', color: card.color, margin: 0, fontFamily: 'monospace', textShadow: `0 0 20px ${card.color}66`, lineHeight: 1 }}>{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
        {['todos', 'operando', 'falha', 'manutenção'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? 'rgba(0,150,255,0.15)' : 'rgba(0,0,0,0.4)', border: `1px solid ${filter === f ? 'rgba(0,150,255,0.4)' : 'rgba(255,255,255,0.05)'}`, borderRadius: '4px', padding: '5px 14px', color: filter === f ? '#00aaff' : '#1e3a5a', cursor: 'pointer', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'monospace' }}>{f}</button>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: '10px', color: '#1e3a5a', fontFamily: 'monospace', display: 'flex', alignItems: 'center' }}>
          {filtered.length} UNIDADE{filtered.length !== 1 ? 'S' : ''} ENCONTRADA{filtered.length !== 1 ? 'S' : ''}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
        <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(0,150,255,0.1)', borderRadius: '8px', padding: '16px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '700', margin: '0 0 12px', color: '#00aaff', letterSpacing: '3px', fontFamily: 'monospace' }}>▸ UNIDADES DE PRODUÇÃO</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {filtered.map(m => (
              <div key={m.id} style={{ background: `${statusColor(m.status)}05`, border: `1px solid ${statusColor(m.status)}18`, borderRadius: '6px', padding: '9px 13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s' }}>
                <div>
                  <p style={{ margin: '0 0 3px', fontWeight: '600', fontSize: '12px', color: '#94a3b8' }}>{m.name}</p>
                  <p style={{ margin: 0, fontSize: '10px', fontFamily: 'monospace' }}>
                    <span style={{ color: tempColor(m.temperature) }}>TEMP:{m.temperature}°C</span>
                    <span style={{ color: '#0f2840', margin: '0 6px' }}>|</span>
                    <span style={{ color: '#2d5a8a' }}>PROD:{m.production}%</span>
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div className={m.status === 'operando' ? 'pulse-green' : m.status === 'falha' ? 'pulse-red' : ''} style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColor(m.status) }} />
                  <span style={{ background: `${statusColor(m.status)}12`, color: statusColor(m.status), fontSize: '9px', fontWeight: '700', padding: '3px 9px', borderRadius: '3px', border: `1px solid ${statusColor(m.status)}30`, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'monospace' }}>{m.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(0,150,255,0.1)', borderRadius: '8px', padding: '16px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '700', margin: '0 0 12px', color: '#00aaff', letterSpacing: '3px', fontFamily: 'monospace' }}>▸ ÍNDICE DE PRODUÇÃO</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {machines.map(m => (
              <div key={m.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '5px', fontFamily: 'monospace' }}>
                  <span style={{ color: '#2d5a8a' }}>{m.name.toUpperCase()}</span>
                  <span style={{ color: statusColor(m.status), textShadow: `0 0 8px ${statusColor(m.status)}` }}>{m.production}%</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.03)', borderRadius: '2px' }}>
                  <div style={{ width: `${m.production}%`, height: '100%', background: `linear-gradient(90deg, ${statusColor(m.status)}55, ${statusColor(m.status)})`, borderRadius: '2px', boxShadow: `0 0 8px ${statusColor(m.status)}77`, transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)' }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.12)', borderRadius: '6px', padding: '10px 12px' }}>
              <p style={{ margin: '0 0 5px', fontSize: '9px', color: '#1e3a5a', letterSpacing: '2px', fontFamily: 'monospace' }}>PICO</p>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#00ff88', fontFamily: 'monospace', textShadow: '0 0 12px rgba(0,255,136,0.5)' }}>{machines.length > 0 ? Math.max(...machines.map(m => m.production)) : 0}%</p>
            </div>
            <div style={{ background: 'rgba(255,51,85,0.04)', border: '1px solid rgba(255,51,85,0.12)', borderRadius: '6px', padding: '10px 12px' }}>
              <p style={{ margin: '0 0 5px', fontSize: '9px', color: '#1e3a5a', letterSpacing: '2px', fontFamily: 'monospace' }}>MÍNIMO</p>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#ff3355', fontFamily: 'monospace', textShadow: '0 0 12px rgba(255,51,85,0.5)' }}>{machines.length > 0 ? Math.min(...machines.map(m => m.production)) : 0}%</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(0,150,255,0.1)', borderRadius: '8px', padding: '16px' }}>
        <h2 style={{ fontSize: '10px', fontWeight: '700', margin: '0 0 12px', color: '#00aaff', letterSpacing: '3px', fontFamily: 'monospace' }}>▸ LOG DE ALERTAS</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {alerts.map((a, i) => (
            <div key={a.id} style={{ background: a.type === 'critico' ? 'rgba(255,51,85,0.05)' : a.type === 'aviso' ? 'rgba(255,170,0,0.05)' : 'rgba(255,255,255,0.02)', border: `1px solid ${a.type === 'critico' ? 'rgba(255,51,85,0.2)' : a.type === 'aviso' ? 'rgba(255,170,0,0.2)' : 'rgba(255,255,255,0.04)'}`, borderRadius: '6px', padding: '9px 13px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div className={a.type === 'critico' ? 'pulse-red' : ''} style={{ width: '6px', height: '6px', borderRadius: '50%', background: a.type === 'critico' ? '#ff3355' : a.type === 'aviso' ? '#ffaa00' : '#1e3a5a', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px', fontWeight: '700', fontSize: '11px', color: a.type === 'critico' ? '#ff3355' : a.type === 'aviso' ? '#ffaa00' : '#2d5a8a', letterSpacing: '1px', fontFamily: 'monospace' }}>{a.machine}</p>
                <p style={{ margin: 0, fontSize: '10px', color: '#1e3a5a', fontFamily: 'monospace' }}>{a.message}</p>
              </div>
              <span style={{ fontSize: '9px', color: '#0f2840', fontFamily: 'monospace' }}>LOG-{String(i + 1).padStart(3, '0')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<'landing' | 'dashboard'>('landing');
  return page === 'landing'
    ? <LandingPage onEnter={() => setPage('dashboard')} />
    : <Dashboard onBack={() => setPage('landing')} />;
}
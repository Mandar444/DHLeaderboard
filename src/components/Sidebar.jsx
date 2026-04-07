import React from 'react';
import { 
  BarChart3, 
  User, 
  Shield, 
  Terminal as TerminalIcon
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: <BarChart3 size={18} />, label: 'Leaderboard', active: true },
    { icon: <User size={18} />, label: 'My Stats' },
    { icon: <Shield size={18} />, label: 'Rules' },
    { icon: <TerminalIcon size={18} />, label: 'Terminal' },
  ];

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div style={{ padding: '40px 32px' }}>
        <h1 className="font-display" style={{ fontSize: '18px', letterSpacing: '0.2em', color: '#fff' }}>
          KINETIC<span style={{ color: '#00f0ff' }}>_TERMINAL</span>
        </h1>
      </div>

      {/* Operator Status */}
      <div style={{ padding: '0 32px 48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span className="font-display" style={{ fontSize: '10px', color: '#00f0ff', letterSpacing: '0.2em' }}>OPERATOR_01</span>
          <span className="font-mono" style={{ fontSize: '9px', color: '#4a5568', letterSpacing: '0.1em' }}>RANK: ELITE</span>
        </div>
        <div style={{ width: '48px', height: '1px', background: '#00f0ff', marginTop: '16px', opacity: 0.3 }} />
      </div>

      {/* Nav List */}
      <nav style={{ flex: 1 }}>
        {navItems.map((item, index) => (
          <a key={index} href="#" className={`nav-link ${item.active ? 'active' : ''}`}>
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Footer Action */}
      <div style={{ padding: '32px' }}>
        <div style={{ background: '#0a0c12', border: '1px solid #1a1c24', padding: '24px', borderRadius: '4px' }}>
          <span className="font-display" style={{ fontSize: '8px', color: '#4a5568', letterSpacing: '0.2em', display: 'block', marginBottom: '16px' }}>SYSTEM_ACCESS</span>
          <button className="btn-cyan" style={{ width: '100%', padding: '12px' }}>GO_PRO</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

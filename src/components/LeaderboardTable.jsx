import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock } from 'lucide-react';

const LeaderboardTable = ({ participants }) => {
  const tableData = participants.slice(3);

  return (
    <div style={{ background: '#0a0c1233', border: '1px solid #1a1c24', borderRadius: '4px' }}>
      {/* Header */}
      <div className="table-row" style={{ background: '#0a0c12', borderBottom: '1px solid #1a1c24' }}>
        <span className="font-display" style={{ fontSize: '9px', color: '#2d3748', letterSpacing: '0.2em' }}>RANK</span>
        <span className="font-display" style={{ fontSize: '9px', color: '#2d3748', letterSpacing: '0.2em' }}>NAME</span>
        <span className="font-display" style={{ fontSize: '9px', color: '#2d3748', letterSpacing: '0.2em', textAlign: 'center' }}>STREAK</span>
        <span className="font-display" style={{ fontSize: '9px', color: '#2d3748', letterSpacing: '0.2em', textAlign: 'center' }}>AVG_SPEED</span>
        <span className="font-display" style={{ fontSize: '9px', color: '#2d3748', letterSpacing: '0.2em', textAlign: 'right' }}>TOTAL_SCORE</span>
      </div>

      {/* Body */}
      {tableData.map((p, idx) => (
        <motion.div 
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: idx * 0.05 }}
          className="table-row"
        >
          <span className="rank-text">
            {(p.rank || (idx + 4)).toString().padStart(2, '0')}
          </span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #1a1c24' }}>
              <img src={p.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
            </div>
            <span className="font-display" style={{ fontSize: '11px', color: '#cbd5e0', letterSpacing: '0.1em' }}>{p.name}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#adff2f' }}>
            <Flame size={14} />
            <span className="font-mono" style={{ fontSize: '10px', fontWeight: 'bold' }}>{p.streak}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#4a5568' }}>
            <Clock size={14} />
            <span className="font-mono" style={{ fontSize: '10px' }}>{p.avg_speed}</span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="font-mono" style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>
              {p.total.toLocaleString()}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LeaderboardTable;

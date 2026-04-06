import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Clock, Zap, Sparkles } from 'lucide-react';

export const HeaderStats = ({ totalParticipants, avgScore }) => {
  return (
    <div className="stats-grid">
      <motion.div whileHover={{ y: -3 }} className="stat-card glass">
        <div className="si-icon">
          <Users size={20} color="var(--devhub-green)" />
        </div>
        <div className="s-info">
          <span className="s-label">Fleet Size</span>
          <span className="s-value">{totalParticipants}</span>
        </div>
      </motion.div>
      <motion.div whileHover={{ y: -3 }} className="stat-card glass">
        <div className="si-icon">
          <Target size={20} color="var(--devhub-green)" />
        </div>
        <div className="s-info">
          <span className="s-label">Engine Avg Pts</span>
          <span className="s-value">{avgScore.toFixed(1)}</span>
        </div>
      </motion.div>
      
      <style>{`
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-bottom: 2.5rem; }
        @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr; } }
        .stat-card { padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 1.25rem; }
        .si-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: rgba(16, 255, 156, 0.05); }
        .s-info { display: flex; flex-direction: column; }
        .s-label { font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; font-weight: 800; letter-spacing: 0.1em; }
        .s-value { font-size: 1.5rem; font-weight: 800; color: var(--text-main); font-family: 'Outfit'; }
      `}</style>
    </div>
  );
};

export const TodayTopPerformer = ({ performer }) => {
  if (!performer) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="alpha-vessel glass"
    >
      <div className="alpha-badge-v2"><Sparkles size={12} /> HIGHEST OPERATIVE OF DAY 1</div>
      <div className="alpha-row">
        <div className="alpha-p-info">
          <h2 className="alpha-p-name font-outfit">{performer.name}</h2>
          <p className="alpha-p-sub font-semibold">Highest structural accuracy in latest session</p>
        </div>
        <div className="alpha-p-score">
          <div className="neon-pts-chip glass">
            <Zap size={24} color="var(--devhub-green)" fill="rgba(16, 255, 156, 0.2)" />
            <div className="n-pts-group">
              <span className="n-num font-outfit">{performer.todayScore}</span>
              <span className="n-unit uppercase tracking-widest font-black">Mark Aggregate</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .alpha-vessel { 
          margin-bottom: 3.5rem; 
          padding: 2.5rem 3rem; 
          border-left: 4px solid var(--devhub-green);
          background: linear-gradient(135deg, var(--bg-card) 0%, rgba(16, 255, 156, 0.01) 100%);
        }
        .alpha-badge-v2 { font-size: 0.65rem; color: var(--devhub-green); font-weight: 900; letter-spacing: 0.25em; margin-bottom: 2rem; display: flex; align-items: center; gap: 0.65rem; opacity: 0.8; }
        .alpha-row { display: flex; justify-content: space-between; align-items: flex-end; }
        .alpha-p-name { font-size: 3.5rem; font-weight: 900; line-height: 1; margin-bottom: 0.5rem; color: var(--text-main); }
        .alpha-p-sub { font-size: 1rem; color: var(--text-muted); opacity: 0.8; }
        
        .neon-pts-chip { 
          padding: 1rem 1.75rem; 
          display: flex; 
          align-items: center; 
          gap: 1.25rem; 
          background: rgba(16, 255, 156, 0.03);
          border: 1px solid var(--border-color);
        }
        .n-pts-group { display: flex; flex-direction: column; }
        .n-num { font-size: 3rem; font-weight: 900; line-height: 0.9; color: var(--text-main); }
        .n-unit { font-size: 0.6rem; color: var(--text-muted); margin-top: 0.25rem; }

        @media (max-width: 850px) {
          .alpha-vessel { padding: 2rem; border-left: none; border-top: 4px solid var(--devhub-green); }
          .alpha-row { flex-direction: column; align-items: center; text-align: center; gap: 2.5rem; }
          .alpha-badge-v2 { justify-content: center; }
          .alpha-p-name { font-size: 2.5rem; }
          .n-num { font-size: 2.75rem; }
        }
      `}</style>
    </motion.div>
  );
};

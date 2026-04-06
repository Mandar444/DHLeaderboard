import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Users, Clock, Sparkles } from 'lucide-react';

const HeaderStats = ({ totalParticipants, avgScore, lastUpdate }) => {
  return (
    <div className="stats-grid">
      <motion.div whileHover={{ y: -5 }} className="stat-card glass">
        <div className="s-icon-bg bg-neon">
          <Users size={22} color="var(--devhub-green)" />
        </div>
        <div className="s-info">
          <span className="s-label">Fleet Size</span>
          <span className="s-value">{totalParticipants}</span>
        </div>
      </motion.div>
      <motion.div whileHover={{ y: -5 }} className="stat-card glass">
        <div className="s-icon-bg bg-neon">
          <Target size={22} color="var(--devhub-green)" />
        </div>
        <div className="s-info">
          <span className="s-label">Engine Avg Pts</span>
          <span className="s-value">{avgScore.toFixed(1)}</span>
        </div>
      </motion.div>
      <motion.div whileHover={{ y: -5 }} className="stat-card glass">
        <div className="s-icon-bg bg-neon">
          <Clock size={22} color="var(--devhub-green)" />
        </div>
        <div className="s-info">
          <span className="s-label">Last Transmission</span>
          <span className="s-value">{lastUpdate}</span>
        </div>
      </motion.div>
      
      <style>{`
        .stats-grid { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 1.5rem; 
          margin-bottom: 2.5rem; 
        }
        @media (max-width: 768px) {
          .stats-grid { 
            grid-template-columns: repeat(2, 1fr); 
            gap: 1rem;
          }
        }
        @media (max-width: 480px) {
          .stats-grid { 
            grid-template-columns: 1fr; 
          }
        }
        .stat-card { padding: 1.5rem; display: flex; align-items: center; gap: 1.25rem; background: var(--bg-card); border: 1px solid var(--border-color); }
        .s-icon-bg { width: 52px; height: 52px; border-radius: 1.1rem; display: flex; align-items: center; justify-content: center; }
        .bg-neon { background: var(--accent-glow); }
        .s-info { display: flex; flex-direction: column; }
        .s-label { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 900; letter-spacing: 0.1em; }
        .s-value { font-size: 1.75rem; font-weight: 800; color: var(--text-main); font-family: 'Outfit'; }
      `}</style>
    </div>
  );
};

const TodayTopPerformer = ({ performer }) => {
  if (!performer) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="alpha-vessel"
    >
      <div className="alpha-glow"></div>
      <div className="alpha-badge"><Sparkles size={14} /> ELITE ALPHA OF DAY 1</div>
      <div className="alpha-body">
        <div className="alpha-performer">
          <h2 className="alpha-name font-outfit">{performer.name}</h2>
          <p className="alpha-mission">Highest structural accuracy in current deployment</p>
        </div>
        <div className="alpha-metrics">
          <div className="alpha-pts-vial glass">
            <Zap size={36} color="var(--devhub-green)" fill="var(--devhub-green)" className="zap-glow" />
            <div className="pts-data">
              <span className="num font-outfit">{performer.todayScore}</span>
              <span className="unit font-black">MARK TOTAL</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .alpha-vessel { 
          margin-bottom: 3rem; 
          padding: 3rem; 
          background: linear-gradient(135deg, var(--devhub-dark) 0%, #064e3b 100%); 
          border: 1px solid var(--devhub-green);
          border-radius: 2.5rem;
          position: relative;
          color: white;
          box-shadow: 0 30px 60px -15px var(--accent-glow);
          overflow: hidden;
        }
        .alpha-glow {
          position: absolute;
          top: -50%;
          right: -20%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          filter: blur(40px);
        }
        .alpha-badge { position: relative; z-index: 2; font-size: 0.75rem; font-weight: 900; letter-spacing: 0.2em; margin-bottom: 2rem; display: flex; align-items: center; gap: 0.75rem; color: var(--devhub-green); }
        .alpha-body { display: flex; justify-content: space-between; align-items: flex-end; position: relative; z-index: 2; }
        .alpha-name { font-size: 4rem; font-weight: 950; line-height: 1; letter-spacing: -0.03em; margin-bottom: 0.5rem; color: white; }
        .alpha-mission { font-size: 1.1rem; font-weight: 600; color: rgba(255,255,255,0.7); }
        
        .alpha-pts-vial { padding: 1.25rem 2rem; display: flex; align-items: center; gap: 1.5rem; background: rgba(16, 255, 156, 0.1); border: 1px solid var(--devhub-green); border-radius: 1.75rem; }
        .pts-data { display: flex; flex-direction: column; }
        .pts-data .num { font-size: 4rem; font-weight: 900; line-height: 0.9; color: var(--devhub-green); }
        .pts-data .unit { font-size: 0.7rem; letter-spacing: 0.2em; color: var(--devhub-green); opacity: 0.6; margin-top: 0.5rem; }
        .zap-glow { filter: drop-shadow(0 0 15px var(--devhub-green)); }

        @media (max-width: 850px) {
          .alpha-vessel { padding: 2rem 1.5rem; border-radius: 1.5rem; margin-bottom: 2rem; }
          .alpha-body { flex-direction: column; align-items: center; text-align: center; gap: 2rem; }
          .alpha-badge { left: 50%; transform: translateX(-50%); white-space: nowrap; }
          .alpha-name { font-size: 2.25rem; }
          .pts-data .num { font-size: 3rem; }
          .alpha-pts-vial { width: 100%; justify-content: center; }
        }
      `}</style>
    </motion.div>
  );
};

export { HeaderStats, TodayTopPerformer };

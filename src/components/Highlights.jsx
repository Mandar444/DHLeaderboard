import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Users, Clock, Sparkles } from 'lucide-react';

const HeaderStats = ({ totalParticipants, avgScore, lastUpdate }) => {
  return (
    <div className="stats-grid">
      <motion.div whileHover={{ y: -5 }} className="stat-card glass">
        <div className="s-icon-bg bg-indigo">
          <Users size={22} color="#6366f1" />
        </div>
        <div className="s-info">
          <span className="s-label">Fleet Size</span>
          <span className="s-value">{totalParticipants}</span>
        </div>
      </motion.div>
      <motion.div whileHover={{ y: -5 }} className="stat-card glass">
        <div className="s-icon-bg bg-teal">
          <Target size={22} color="#06b6d4" />
        </div>
        <div className="s-info">
          <span className="s-label">Engine Avg Pts</span>
          <span className="s-value">{avgScore.toFixed(1)}</span>
        </div>
      </motion.div>
      <motion.div whileHover={{ y: -5 }} className="stat-card glass">
        <div className="s-icon-bg bg-orange">
          <Clock size={22} color="#f97316" />
        </div>
        <div className="s-info">
          <span className="s-label">Last Transmission</span>
          <span className="s-value">{lastUpdate}</span>
        </div>
      </motion.div>
      
      <style>{`
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem; }
        .stat-card { padding: 1.5rem; display: flex; align-items: center; gap: 1.25rem; background: white; border: 1px solid rgba(99, 102, 241, 0.05); }
        .s-icon-bg { width: 52px; height: 52px; border-radius: 1.1rem; display: flex; align-items: center; justify-content: center; }
        .bg-indigo { background: rgba(99, 102, 241, 0.08); }
        .bg-teal { background: rgba(6, 182, 212, 0.08); }
        .bg-orange { background: rgba(249, 115, 22, 0.08); }
        .s-info { display: flex; flex-direction: column; }
        .s-label { font-size: 0.7rem; color: #64748b; text-transform: uppercase; font-weight: 900; letter-spacing: 0.1em; }
        .s-value { font-size: 1.75rem; font-weight: 800; color: #1e293b; font-family: 'Outfit'; }
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
            <Zap size={36} color="#fbbf24" fill="#fbbf24" className="zap-glow" />
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
          background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); 
          border-radius: 2.5rem;
          position: relative;
          color: white;
          box-shadow: 0 30px 60px -15px rgba(79, 70, 229, 0.4);
          overflow: hidden;
        }
        .alpha-glow {
          position: absolute;
          top: -50%;
          right: -20%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
          filter: blur(40px);
        }
        .alpha-badge { position: relative; z-index: 2; font-size: 0.75rem; font-weight: 900; letter-spacing: 0.2em; margin-bottom: 2rem; display: flex; align-items: center; gap: 0.75rem; color: rgba(255,255,255,0.8); }
        .alpha-body { display: flex; justify-content: space-between; align-items: flex-end; position: relative; z-index: 2; }
        .alpha-name { font-size: 4rem; font-weight: 950; line-height: 1; letter-spacing: -0.03em; margin-bottom: 0.5rem; }
        .alpha-mission { font-size: 1.1rem; font-weight: 600; color: rgba(255,255,255,0.7); }
        
        .alpha-pts-vial { padding: 1.25rem 2rem; display: flex; align-items: center; gap: 1.5rem; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: 1.75rem; }
        .pts-data { display: flex; flex-direction: column; }
        .pts-data .num { font-size: 4rem; font-weight: 900; line-height: 0.9; }
        .pts-data .unit { font-size: 0.7rem; letter-spacing: 0.2em; opacity: 0.6; margin-top: 0.5rem; }
        .zap-glow { filter: drop-shadow(0 0 15px #fbbf24); }

        @media (max-width: 850px) {
          .alpha-body { flex-direction: column; align-items: flex-start; gap: 2.5rem; }
          .alpha-name { font-size: 2.5rem; }
          .pts-data .num { font-size: 3rem; }
        }
      `}</style>
    </motion.div>
  );
};

export { HeaderStats, TodayTopPerformer };

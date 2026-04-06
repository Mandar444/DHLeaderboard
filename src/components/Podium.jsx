import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown, Sparkles } from 'lucide-react';

const Podium = ({ winners }) => {
  if (!winners || winners.length < 3) return null;

  const [silver, gold, bronze] = [winners[1], winners[0], winners[2]];

  const items = [
    { ...silver, rank: 2, icon: <Medal size={40} />, color: 'var(--text-muted)' },
    { ...gold, rank: 1, icon: <Trophy size={60} />, color: 'var(--devhub-green)' },
    { ...bronze, rank: 3, icon: <Award size={32} />, color: 'var(--text-muted)' }
  ];

  return (
    <div className="podium-root">
      <div className="podium-grid">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className={`podium-card rank-${item.rank} premium-hover`}
          >
            {/* Minimal Rank Plate */}
            <div className={`rank-plate rank-bg-${item.rank} font-black`}>
              <span>0{item.rank}</span>
            </div>

            {/* Rank 1 Crown Accent (Subtle) */}
            {item.rank === 1 && (
              <div className="crown-anchor">
                <Crown size={32} color="var(--devhub-green)" className="crown-icon animate-float" />
              </div>
            )}

            {/* Avatar Orbit */}
            <div className={`avatar-orbit ${item.rank === 1 ? 'rank-1-orbit' : ''}`}>
               <div className="avatar-content" style={{ color: item.color }}>
                  {item.icon}
               </div>
            </div>

            {/* Performer Info */}
            <div className="p-data">
              <h3 className="p-name font-outfit">{item.name}</h3>
              <div className="p-badge uppercase">Elite Participant</div>
              
              <div className="p-score-box">
                <span className="p-val font-outfit">{item.total}</span>
                <span className="p-unit uppercase">Points</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .podium-root { padding: 8rem 0 6rem; }
        .podium-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; align-items: flex-end; max-width: 1100px; margin: 0 auto; }
        
        .podium-card {
          position: relative;
          padding: 4rem 2rem 2.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 2.5rem;
        }
        .rank-1 { height: 500px; order: 2; border-color: var(--devhub-green); background: linear-gradient(135deg, var(--bg-card) 0%, rgba(16, 255, 156, 0.02) 100%); }
        .rank-2 { height: 400px; order: 1; opacity: 0.9; }
        .rank-3 { height: 340px; order: 3; opacity: 0.8; }

        .rank-plate {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: 900;
          color: #000;
        }
        .rank-bg-1 { background: var(--devhub-green); }
        .rank-bg-2 { background: var(--text-muted); color: #fff; }
        .rank-bg-3 { background: var(--text-muted); color: #fff; }

        .crown-anchor { position: absolute; top: -50px; }
        .crown-icon { opacity: 0.8; }

        .avatar-orbit {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 4px solid var(--border-color);
          margin-bottom: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rank-1-orbit { width: 150px; height: 150px; border-color: var(--devhub-green); }
        .avatar-content { display: flex; align-items: center; justify-content: center; }

        .p-data { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
        .p-name { font-size: 1.75rem; font-weight: 950; color: var(--text-main); line-height: 1.1; }
        .rank-1 .p-name { font-size: 2.25rem; }
        .p-badge { font-size: 0.7rem; font-weight: 900; color: var(--text-muted); opacity: 0.6; letter-spacing: 0.1em; }

        .p-score-box { 
          margin-top: 1.5rem;
          padding: 0.75rem 1.75rem; 
          background: rgba(0,0,0,0.15); 
          border-radius: 1.25rem;
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }
        .p-val { font-size: 2rem; font-weight: 900; color: var(--text-main); }
        .rank-1 .p-val { color: var(--devhub-green); }
        .p-unit { font-size: 0.65rem; color: var(--text-muted); font-weight: 800; }

        @media (max-width: 768px) {
          .podium-grid { display: flex; flex-direction: column; gap: 1.25rem; }
          .podium-card { width: 100%; height: auto !important; padding: 2.5rem 1.5rem; }
          .rank-1 { order: 1; }
          .rank-2 { order: 2; }
          .rank-3 { order: 3; }
          .avatar-orbit { width: 80px !important; height: 80px !important; margin-bottom: 1.5rem; }
          .p-name { font-size: 1.5rem !important; }
          .rank-plate { top: 1rem; left: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default Podium;

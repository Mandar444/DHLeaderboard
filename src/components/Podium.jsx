import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown, Sparkles } from 'lucide-react';

const Podium = ({ winners }) => {
  if (!winners || winners.length < 3) return null;

  const [silver, gold, bronze] = [winners[1], winners[0], winners[2]];

  const items = [
    { ...silver, rank: 2, icon: <Medal size={40} />, color: 'var(--silver)', aura: 'rgba(148, 163, 184, 0.15)' },
    { ...gold, rank: 1, icon: <Trophy size={60} />, color: 'var(--gold)', aura: 'rgba(245, 158, 11, 0.25)' },
    { ...bronze, rank: 3, icon: <Award size={32} />, color: 'var(--bronze)', aura: 'rgba(180, 83, 9, 0.15)' }
  ];

  return (
    <div className="podium-root">
      <div className="podium-grid">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, type: 'spring', damping: 15 }}
            className={`podium-card rank-${item.rank} premium-hover`}
            style={{ '--rank-aura': item.aura, '--rank-color': item.color }}
          >
            {/* Prismatic Badge */}
            <div className={`rank-plate rank-bg-${item.rank} font-black`}>
              <span>RANK 0{item.rank}</span>
            </div>

            {/* Cinematic Winner Aura */}
            {item.rank === 1 && (
              <div className="vessel-crown">
                <Crown className="crown-shimmer animate-float" />
                <div className="aura-ring glow-animate"></div>
              </div>
            )}

            {/* Avatar & Icon Core */}
            <div className={`avatar-orbit rank-border-${item.rank} ${item.rank === 1 ? 'animate-float' : ''}`}>
              <div className="avatar-glass">
                {item.icon}
              </div>
            </div>

            {/* Performance Stats */}
            <div className="performer-data">
              <h3 className="performer-id font-outfit">{item.name}</h3>
              <div className="performer-badge">ELITE OPERATIVE</div>
              
              <div className="pts-vial-glass">
                <span className="pts-count font-outfit">{item.total}</span>
                <span className="pts-unit font-black">MARK</span>
              </div>
            </div>

            {/* Bottom Glow */}
            <div className="vessel-shadow"></div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .podium-root { padding: 8rem 0 6rem; }
        .podium-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; align-items: flex-end; max-width: 1100px; margin: 0 auto; }
        
        .podium-card {
          position: relative;
          padding: 4.5rem 2rem 3rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 3rem;
          background: white;
          box-shadow: 0 25px 60px -15px var(--rank-aura);
          border: 2px solid rgba(255,255,255,0.9);
        }
        .rank-1 { height: 520px; order: 2; border-color: rgba(245, 158, 11, 0.4); margin-bottom: 2rem; background: linear-gradient(135deg, white 0%, rgba(245, 158, 11, 0.08) 100%); }
        .rank-2 { height: 420px; order: 1; filter: saturate(0.9); border-color: rgba(148, 163, 184, 0.2); }
        .rank-3 { height: 350px; order: 3; filter: saturate(0.8); border-color: rgba(180, 83, 9, 0.2); }

        .rank-plate {
          position: absolute;
          top: 1.75rem;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: white;
          box-shadow: 0 8px 20px -5px rgba(0,0,0,0.1);
          z-index: 5;
        }
        .rank-bg-1 { background: var(--gold); }
        .rank-bg-2 { background: var(--silver); }
        .rank-bg-3 { background: var(--bronze); }

        .vessel-crown { position: absolute; top: -75px; display: flex; justify-content: center; width: 100%; }
        .crown-shimmer { color: var(--gold); filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.6)); width: 50px; height: 50px; }
        .aura-ring { position: absolute; width: 220px; height: 220px; background: radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%); top: -40px; pointer-events: none; }

        .avatar-orbit {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: white;
          border: 10px solid rgba(255, 255, 255, 0.8);
          margin-bottom: 3rem;
          box-shadow: 0 15px 35px rgba(0,0,0,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .rank-1 .avatar-orbit { width: 170px; height: 170px; border-width: 15px; }
        .avatar-glass { color: var(--rank-color); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }

        .performer-data { flex: 1; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
        .performer-id { font-size: 1.8rem; color: #1e293b; font-weight: 900; line-height: 1; letter-spacing: -0.02em; }
        .rank-1 .performer-id { font-size: 2.5rem; letter-spacing: -0.04em; }
        
        .performer-badge { font-size: 0.8rem; color: #64748b; font-weight: 900; letter-spacing: 0.12em; margin-bottom: 1rem; opacity: 0.6; }

        .pts-vial-glass { 
          padding: 1rem 2rem; 
          background: #f8faff; 
          border: 1px solid rgba(99, 102, 241, 0.08);
          border-radius: 1.5rem;
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
        }
        .pts-count { font-size: 2.25rem; font-weight: 950; color: #1e293b; }
        .rank-1 .pts-count { font-size: 3rem; color: var(--gold); }
        .pts-unit { font-size: 0.75rem; color: #94a3b8; letter-spacing: 0.15em; }

        .vessel-shadow { position: absolute; bottom: -30px; height: 15px; width: 50%; border-radius: 50%; background: #6366f1; filter: blur(25px); opacity: 0.06; }

        @media (max-width: 900px) {
          .podium-root { padding: 4rem 0 2rem; }
          .podium-grid { gap: 0.75rem; margin: 0; padding: 0 0.5rem; }
          .rank-1 { height: 360px; padding: 2.5rem 1rem 1.5rem; }
          .rank-2 { height: 280px; padding: 2rem 0.75rem 1rem; }
          .rank-3 { height: 240px; padding: 2rem 0.5rem 1rem; }
          .performer-id { font-size: 1.1rem; }
          .rank-1 .performer-id { font-size: 1.25rem; }
          .pts-count { font-size: 1.5rem; }
          .rank-1 .pts-count { font-size: 1.75rem; }
          .avatar-orbit { width: 80px; height: 80px; margin-bottom: 1.5rem; }
          .rank-1 .avatar-orbit { width: 100px; height: 100px; }
          .rank-plate { font-size: 0.6rem; top: 1.25rem; padding: 0.3rem 0.6rem; }
        }
      `}</style>
    </div>
  );
};

export default Podium;

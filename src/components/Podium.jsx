import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Podium = ({ winners }) => {
  if (!winners || winners.length === 0) return null;

  // Render in order: 🥈, 🥇, 🥉
  const displayWinners = [
    winners[1] || { name: 'RECURSION_KING', total: 17902, rank: 2 },
    winners[0] || { name: 'CYBER_PHANTOM_99', total: 18442, rank: 1 },
    winners[2] || { name: 'VOID_LOGGER', total: 16110, rank: 3 },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '32px', height: '400px' }}>
      {displayWinners.map((winner, index) => {
        const isFirst = winner.rank === 1;
        const color = isFirst ? '#ffd700' : winner.rank === 2 ? '#00f0ff' : '#cd7f32';
        
        return (
          <motion.div
            key={winner.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="podium-card"
          >
            {/* Image Frame */}
            <div className="portrait-frame" style={{ 
              width: isFirst ? '120px' : '96px', 
              height: isFirst ? '120px' : '96px',
              borderColor: isFirst ? '#ffd70033' : '#1a1c24'
            }}>
              <div className="rank-badge-podium" style={{ borderColor: color, color: color }}>
                #{winner.rank.toString().padStart(2, '0')}
              </div>
              <img 
                src={winner.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${winner.name}`} 
                alt="" 
                style={{ width: '100%', height: '100%', objectCover: 'cover', borderRadius: '4px', opacity: 0.8 }} 
              />
            </div>

            {/* Info Box */}
            <div className="card-dark" style={{ 
              width: '260px', 
              textAlign: 'center', 
              borderTop: `2px solid ${color}`,
              background: isFirst ? 'linear-gradient(180deg, rgba(255, 215, 0, 0.03), transparent)' : 'var(--bg-card)'
            }}>
              <Star size={16} color={color} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <h3 className="font-display" style={{ fontSize: '14px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                {winner.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span className="font-mono" style={{ fontSize: '18px', fontWeight: 'bold', color: color }}>
                  {winner.total.toLocaleString()}
                </span>
                <span className="font-mono" style={{ fontSize: '10px', color: '#4a5568' }}>PTS</span>
              </div>
              
              <div style={{ marginTop: '24px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <div style={{ background: '#05070a', border: '1px solid #1a1c24', padding: '4px 12px', fontSize: '8px', fontFamily: 'Orbitron', color: '#4a5568', letterSpacing: '0.1em' }}>
                  {isFirst ? 'WORLD_CLASS' : 'ELITE'}
                </div>
                {isFirst && (
                  <div style={{ background: '#05070a', border: '1px solid #1a1c24', padding: '4px 12px', fontSize: '8px', fontFamily: 'Orbitron', color: '#4a5568', letterSpacing: '0.1em' }}>
                    LEGEND
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Podium;

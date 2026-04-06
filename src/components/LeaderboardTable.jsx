import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ChevronRight, Zap, Sparkles, TrendingUp, Info } from 'lucide-react';

const LeaderboardTable = ({ participants }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const maxScore = Math.max(...participants.map(p => p.total), 1);
  const filtered = participants.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lb-section">
      <header className="lb-controls">
        <div className="title-area">
          <div className="brand-badge mini">LEGION RANKINGS</div>
          <h2 className="section-title font-black text-grad-devhub">Active Contestants</h2>
        </div>
        
        <div className="search-box glass">
          <input 
            type="text" 
            placeholder="Search by operative name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon />
        </div>
      </header>

      <div className="lb-viewport glass">
        <div className="lb-head">
          <div className="lb-col col-rank">#</div>
          <div className="lb-col col-operative">Operative / Team</div>
          <div className="lb-col col-streak">Active</div>
          <div className="lb-col col-pts">Score</div>
          <div className="lb-col col-action"></div>
        </div>

        <div className="lb-body">
          <AnimatePresence>
            {filtered.map((item, index) => (
              <React.Fragment key={item.id}>
                <motion.div 
                  layout
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className={`lb-row premium-hover ${expandedId === item.id ? 'active' : ''}`}
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  {/* Prismatic Progress Indicator */}
                  <div 
                    className="row-progress-bar" 
                    style={{ width: `${(item.total / maxScore) * 100}%`, background: 'rgba(16, 255, 156, 0.05)' }}
                  ></div>

                  <div className="lb-col col-rank">
                    <div className={`rank-tag font-black ${index < 3 ? 'top-tier' : ''}`} 
                         style={{ '--color': index < 3 ? 'var(--devhub-green)' : 'var(--text-muted)' }}>
                      {index + 1}
                    </div>
                  </div>

                  <div className="lb-col col-operative">
                    <div className="op-flex">
                      <span className="p-name font-outfit">{item.name}</span>
                      {item.bonus > 0 && (
                        <div className="bonus-chip glass-pill font-black">
                          <Zap size={11} fill="currentColor" />
                          <span>+{item.bonus}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lb-col col-streak">
                    {item.streak >= 3 ? (
                      <div className="streak-pulsar anim-pulse">
                        <Flame size={16} fill="#fb7185" />
                        <span>{item.streak}</span>
                      </div>
                    ) : item.streak > 0 ? (
                      <div className="streak-pulsar cold">
                        <Flame size={14} fill="#94a3b8" opacity={0.6} />
                        <span>{item.streak}</span>
                      </div>
                    ) : '-'}
                  </div>

                  <div className="lb-col col-pts">
                    <div className="pts-group font-outfit">
                      <span className="val font-black">{item.total}</span>
                    </div>
                  </div>

                  <div className="lb-col col-action">
                    <motion.div animate={{ rotate: expandedId === item.id ? 90 : 0 }}>
                      <ChevronRight size={18} color="#cbd5e1" strokeWidth={3} />
                    </motion.div>
                  </div>
                </motion.div>

                {expandedId === item.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="lb-expanded-gate"
                  >
                    <div className="expansion-grid">
                      <div className="expansion-card glass data-grid">
                        <header className="font-black"><Info size={14} /> DIAGNOSTIC BREAKDOWN</header>
                        <div className="mark-slots">
                          {Object.entries(item.scores).map(([day, val]) => (
                            <div key={day} className={`slot-box ${val > 0 ? 'engaged' : ''}`}>
                              <span className="label font-black">{day.toUpperCase()}</span>
                              <span className="score font-outfit">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="expansion-card glass multiplier-grid">
                        <header className="font-black"><Sparkles size={14} /> BOOST PROTOCOLS</header>
                        <div className="boost-list">
                          <div className="boost-item"><span>Performance Bonus</span> <strong>+{item.bonus}</strong></div>
                          <div className="boost-item"><span>Consistency Multiplier</span> <strong>+{item.streak >= 3 ? item.streak * 2 : 0}</strong></div>
                        </div>
                        <div className="devhub-tag">APPROVED BY DEVHUB</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .lb-section { margin-top: 4rem; }
        .lb-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; gap: 2rem; }
        .brand-badge.mini { font-size: 0.6rem; padding: 0.2rem 0.5rem; margin-bottom: 0.4rem; background: var(--devhub-green); color: #000; font-weight: 900; border-radius: 4px; }
        
        .search-box { padding: 0.75rem 1.25rem; display: flex; align-items: center; gap: 0.85rem; min-width: 340px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 1rem; }
        .search-box input { background: transparent; border: none; color: var(--text-main); width: 100%; outline: none; font-weight: 600; font-family: 'Inter'; font-size: 0.9rem; }

        .lb-viewport { padding: 0.5rem; border-radius: 2rem; background: var(--bg-card); border: 1px solid var(--border-color); }
        .lb-head { display: grid; grid-template-columns: 70px 1fr 100px 100px 50px; padding: 1.25rem 1rem; font-size: 0.65rem; font-weight: 800; color: var(--text-muted); letter-spacing: 0.12em; text-transform: uppercase; }

        .lb-row { position: relative; display: grid; grid-template-columns: 70px 1fr 100px 100px 50px; padding: 1.1rem 1rem; border-radius: 1.25rem; margin-bottom: 0.4rem; cursor: pointer; overflow: hidden; background: rgba(0,0,0,0.015); border: 1px solid transparent; transition: all 0.3s ease; }
        [data-theme='dark'] .lb-row { background: rgba(255,255,255,0.015); }
        .lb-row.active { background: var(--bg-card); border-color: rgba(16, 255, 156, 0.3); box-shadow: 0 8px 20px var(--shadow-color); }

        .row-progress-bar { position: absolute; left: 0; top: 0; bottom: 0; background: rgba(16, 255, 156, 0.04); pointer-events: none; z-index: 0; }
        .lb-col { position: relative; z-index: 1; display: flex; align-items: center; }

        .rank-tag { width: 34px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 6px; background: rgba(0,0,0,0.04); font-size: 1rem; color: var(--color); border: 1.5px solid var(--color); opacity: 0.8; }
        .top-tier { opacity: 1; border-width: 2px; }

        .op-flex { display: flex; align-items: center; gap: 0.85rem; }
        .p-name { font-size: 1.15rem; font-weight: 700; color: var(--text-main); font-family: 'Inter'; }
        .bonus-chip { color: var(--devhub-green); font-size: 0.75rem; padding: 0.2rem 0.5rem; background: rgba(16, 255, 156, 0.08); border-radius: 6px; font-weight: 800; }

        .streak-pulsar { display: flex; align-items: center; gap: 0.4rem; font-weight: 800; font-size: 0.9rem; color: var(--devhub-green); }
        .streak-pulsar.cold { color: var(--text-muted); opacity: 0.4; }

        .pts-group .val { font-size: 1.5rem; font-weight: 800; color: var(--text-main); font-family: 'Outfit'; }

        .lb-expanded-gate { padding: 0.5rem 1rem 1.5rem; }
        .expansion-grid { display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 1.25rem; }
        .expansion-card { padding: 1.75rem; background: rgba(0,0,0,0.02); border-radius: 1.25rem; border: 1px solid var(--border-color); }
        [data-theme='dark'] .expansion-card { background: rgba(255,255,255,0.01); }
        .expansion-card header { font-size: 0.6rem; color: var(--text-muted); margin-bottom: 1.5rem; font-weight: 800; letter-spacing: 0.12em; }

        .mark-slots { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .slot-box { background: rgba(0,0,0,0.02); padding: 1rem; border-radius: 1rem; min-width: 90px; text-align: center; border: 1px solid var(--border-color); }
        .slot-box.engaged { background: rgba(16, 255, 156, 0.03); border-color: rgba(16, 255, 156, 0.1); }
        .slot-box .label { display: block; font-size: 0.6rem; color: var(--text-muted); margin-bottom: 0.4rem; }
        .slot-box .score { font-size: 1.5rem; font-weight: 800; color: var(--text-main); }

        .boost-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .boost-item { display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--text-muted); }
        .boost-item strong { color: var(--text-main); font-weight: 800; }

        .devhub-tag { margin-top: 1.5rem; font-size: 0.55rem; font-weight: 900; color: var(--devhub-green); opacity: 0.3; text-align: right; letter-spacing: 0.1em; }

        @media (max-width: 900px) {
          .lb-head, .lb-row { grid-template-columns: 40px 1fr 60px; }
          .col-streak, .col-action { display: none; }
          .expansion-grid { grid-template-columns: 1fr; }
          .p-name { font-size: 1rem; }
          .pts-group .val { font-size: 1.25rem; }
        }
      `}</style>
    </div>
  );
};

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export default LeaderboardTable;

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
                    style={{ width: `${(item.total / maxScore) * 100}%` }}
                  ></div>

                  <div className="lb-col col-rank">
                    <div className={`rank-tag font-black ${index < 3 ? 'top-tier' : ''}`} 
                         style={{ '--color': index < 3 ? (index === 0 ? '#fbbf24' : (index === 1 ? '#94a3b8' : '#b45309')) : '#6366f1' }}>
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
        .lb-section { margin-top: 5rem; }
        .lb-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; gap: 2rem; }
        .brand-badge.mini { font-size: 0.65rem; padding: 0.2rem 0.5rem; margin-bottom: 0.5rem; width: fit-content; background: #6366f1; }
        
        .search-box { padding: 0.85rem 1.5rem; display: flex; align-items: center; gap: 1rem; min-width: 360px; background: white; }
        .search-box input { background: transparent; border: none; color: #1e293b; width: 100%; outline: none; font-weight: 700; font-family: 'Outfit'; font-size: 0.95rem; }

        .lb-viewport { padding: 0.75rem; border-radius: 2.5rem; background: white; border: 1px solid rgba(0,0,0,0.02); }
        .lb-head { display: grid; grid-template-columns: 80px 1fr 120px 120px 50px; padding: 1.5rem 1rem; font-size: 0.7rem; font-weight: 950; color: #94a3b8; letter-spacing: 0.15em; text-transform: uppercase; }

        .lb-row { position: relative; display: grid; grid-template-columns: 80px 1fr 120px 120px 50px; padding: 1.5rem 1rem; border-radius: 1.75rem; margin-bottom: 0.75rem; cursor: pointer; overflow: hidden; background: #f8faff; border: 1px solid transparent; }
        .lb-row.active { background: white; border-color: rgba(99, 102, 241, 0.2); box-shadow: 0 15px 35px rgba(99, 102, 241, 0.1); }

        .row-progress-bar { position: absolute; left: 0; top: 0; bottom: 0; background: linear-gradient(to right, rgba(99, 102, 241, 0.08), rgba(6, 182, 212, 0.04)); pointer-events: none; z-index: 0; }
        .lb-col { position: relative; z-index: 1; display: flex; align-items: center; }

        .rank-tag { width: 40px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; background: rgba(0,0,0,0.03); font-size: 1.1rem; color: var(--color); border: 2px solid var(--color); }
        .top-tier { border-width: 3px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }

        .op-flex { display: flex; align-items: center; gap: 1rem; }
        .p-name { font-size: 1.35rem; font-weight: 800; color: #1e293b; }
        .bonus-chip { color: #f59e0b; font-size: 0.8rem; padding: 0.3rem 0.7rem; background: white;  }

        .streak-pulsar { display: flex; align-items: center; gap: 0.5rem; font-weight: 900; font-family: 'Outfit'; font-size: 1rem; color: #fb7185; }
        .streak-pulsar.cold { color: #94a3b8; }
        .anim-pulse { animation: pulse 2s infinite; }

        .pts-group .val { font-size: 1.75rem; color: #1e293b; }

        .lb-expanded-gate { padding: 0.5rem 1.25rem 2rem; }
        .expansion-grid { display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 1.5rem; }
        .expansion-card { padding: 2.25rem; background: white; border-top-left-radius: 0; border-top-right-radius: 0; }
        .expansion-card header { font-size: 0.7rem; color: #94a3b8; margin-bottom: 2rem; display: flex; align-items: center; gap: 0.75rem; letter-spacing: 0.15em; }

        .mark-slots { display: flex; gap: 1rem; flex-wrap: wrap; }
        .slot-box { background: #f8faff; padding: 1.25rem; border-radius: 1.5rem; min-width: 100px; text-align: center; border: 1px solid rgba(0,0,0,0.02); }
        .slot-box.engaged { background: rgba(6, 182, 212, 0.04); border-color: rgba(6, 182, 212, 0.1); }
        .slot-box .label { display: block; font-size: 0.65rem; color: #94a3b8; margin-bottom: 0.5rem; }
        .slot-box .score { font-size: 1.75rem; font-weight: 900; color: #1e293b; }

        .boost-list { list-style: none; display: flex; flex-direction: column; gap: 1.25rem; }
        .boost-item { display: flex; justify-content: space-between; font-size: 1rem; color: #64748b; font-weight: 600; }
        .boost-item strong { color: #1e293b; font-weight: 900; font-family: 'Outfit'; }

        .devhub-tag { margin-top: 2rem; font-size: 0.6rem; font-weight: 900; color: #6366f1; opacity: 0.5; text-align: right; letter-spacing: 0.1em; }

        @media (max-width: 900px) {
          .lb-head, .lb-row { grid-template-columns: 50px 1fr 70px; }
          .col-streak, .col-action { display: none; }
          .expansion-grid { grid-template-columns: 1fr; }
          .p-name { font-size: 1.15rem; font-weight: 800; }
          .pts-group .val { font-size: 1.5rem; }
          .lb-row { padding: 1rem 0.5rem; margin-bottom: 0.5rem; }
          .rank-tag { width: 32px; height: 28px; font-size: 1rem; }
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

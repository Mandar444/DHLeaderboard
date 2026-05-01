import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  X, 
  AlertCircle, 
  Star, 
  Crown,
  ChevronDown,
  ChevronUp,
  Share2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

// Real data from spreadsheet
const rawData = [
    { id: 1, name: 'Naman Khairwar', streak: 2, bonus: 10, day1: 15, day2: 14, day3: 8, day4: 7, day5: 0, day6: 9, day7: 8, day8: 9, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'A' },
    { id: 2, name: 'Kunal Shetty', streak: 12, bonus: 8, day1: 10, day2: 8, day3: 0, day4: 6, day5: 10, day6: 14, day7: 9, day8: 9, day9: 13, day10: 14, day11: 8, day12: 13, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'A' },
    { id: 3, name: 'Saheb Singh Sandhu', streak: 0, bonus: 10, day1: 13, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'C' },
    { id: 4, name: 'Eshan Mohammed', streak: 8, bonus: 10, day1: 10, day2: 10, day3: 0, day4: 7, day5: 14, day6: 0, day7: 14, day8: 13, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'A' },
    { id: 5, name: 'Aaryan Patwardhan', streak: 0, bonus: 7, day1: 7, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'D' },
    { id: 6, name: 'Deetya Shivathaya', streak: 9, bonus: 9, day1: 9, day2: 9, day3: 7, day4: 10, day5: 8, day6: 0, day7: 7, day8: 9, day9: 9, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'A' },
    { id: 7, name: 'Lakshya Somani', streak: 2, bonus: 8, day1: 8, day2: 9, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'C' },
    { id: 8, name: 'Aaryan Raorane', streak: 13, bonus: 7, day1: 7, day2: 7, day3: 10, day4: 14, day5: 12, day6: 8, day7: 12, day8: 0, day9: 8, day10: 9, day11: 8, day12: 9, day13: 11, day14: 0, day15: 12, day16: 8, day17: 8, day18: 9, day19: 8, day20: 8, day21: 9, day22: 8, day23: 7, day24: 0, tier: 'A' },
    { id: 9, name: 'rose', streak: 0, bonus: 7, day1: 7, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'D' },
    { id: 10, name: 'Devesh Sadashiv Hegde', streak: 13, bonus: 8, day1: 10, day2: 10, day3: 6, day4: 8, day5: 8, day6: 12, day7: 13, day8: 7, day9: 8, day10: 7, day11: 11, day12: 7, day13: 8, day14: 0, day15: 10, day16: 7, day17: 8, day18: 9, day19: 7, day20: 8, day21: 7, day22: 9, day23: 6, day24: 9, tier: 'A' },
    { id: 11, name: 'Mansi Bansal', streak: 2, bonus: 7, day1: 7, day2: 9, day3: 12, day4: 10, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'B' },
    { id: 12, name: 'Riya Gupta', streak: 11, bonus: 8, day1: 8, day2: 8, day3: 6, day4: 8, day5: 8, day6: 8, day7: 9, day8: 14, day9: 10, day10: 0, day11: 12, day12: 0, day13: 6, day14: 0, day15: 8, day16: 0, day17: 0, day18: 9, day19: 0, day20: 8, day21: 8, day22: 7, day23: 8, day24: 0, tier: 'A' },
    { id: 13, name: 'Ananya Raut', streak: 1, bonus: 0, day1: 0, day2: 9, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'D' },
    { id: 14, name: 'Rehan Shashi', streak: 1, bonus: 0, day1: 0, day2: 8, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'D' },
    { id: 15, name: 'Prachi Matai', streak: 1, bonus: 0, day1: 0, day2: 8, day3: 0, day4: 10, day5: 8, day6: 0, day7: 8, day8: 0, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'B' },
    { id: 16, name: 'Shreya Ravindra Desai', streak: 1, bonus: 0, day1: 0, day2: 8, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'D' },
    { id: 17, name: 'Vedant', streak: 1, bonus: 0, day1: 0, day2: 6, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'D' },
    { id: 18, name: 'Guruprasad Tukaram Shinde', streak: 1, bonus: 0, day1: 0, day2: 8, day3: 7, day4: 9, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'B' },
    { id: 19, name: 'Nitin', streak: 1, bonus: 0, day1: 0, day2: 0, day3: 12, day4: 7, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, day11: 0, day12: 0, day13: 5, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'B' },
    { id: 20, name: 'Dhanvantri Panjwani', streak: 0, bonus: 0, day1: 0, day2: 0, day3: 0, day4: 2, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'D' },
    { id: 21, name: 'Ananya Bhavesh Raut', streak: 0, bonus: 0, day1: 0, day2: 0, day3: 0, day4: 0, day5: 0, day6: 7, day7: 0, day8: 0, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'D' },
    { id: 22, name: 'Mariam Toofani', streak: 0, bonus: 0, day1: 0, day2: 0, day3: 0, day4: 0, day5: 0, day6: 9, day7: 0, day8: 0, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'D' },
    { id: 23, name: 'Ayesha Toofani', streak: 0, bonus: 0, day1: 0, day2: 0, day3: 0, day4: 0, day5: 8, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, day11: 0, day12: 0, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'D' },
    { id: 25, name: 'TEJAS SHARAD KUTE', streak: 1, bonus: 0, day1: 0, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, day11: 0, day12: 9, day13: 0, day14: 0, day15: 0, day16: 0, day17: 0, day18: 0, day19: 0, day20: 0, day21: 0, day22: 0, day23: 0, day24: 0, tier: 'D' },
];

const calculateTier = (score) => {
    if (score >= 200) return 'S';
    if (score >= 40) return 'A';
    if (score >= 25) return 'B';
    if (score >= 10) return 'C';
    return 'D';
};

const App = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedDay, setSelectedDay] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const processedParticipants = useMemo(() => {
    return rawData.map(p => {
      const total = p.day1 + p.day2 + p.day3 + p.day4 + p.day5 + p.day6 + p.day7 + p.day8 + p.day9 + p.day10 + p.day11 + p.day12 + p.day13 + p.day14 + p.day15 + p.day16 + p.day17 + p.day18 + p.day19 + p.day20 + p.day21 + p.day22 + p.day23 + p.day24;
      return {
        ...p,
        total,
        tier: calculateTier(total)
      };
    });
  }, []);
 // Static data doesn't need dependencies

  const getFilteredData = () => {
    let list = [...processedParticipants];
    if (activeTab === 'daily') {
      list.sort((a, b) => {
        const scoreA = playerDailyScore(a, selectedDay);
        const scoreB = playerDailyScore(b, selectedDay);
        return scoreB - scoreA;
      });
    } else {
      list.sort((a, b) => b.total - a.total);
    }
    return list;
  };

  const playerDailyScore = (player, day) => {
    switch(day) {
      case 1: return player.day1;
      case 2: return player.day2;
      case 3: return player.day3;
      case 4: return player.day4;
      case 5: return player.day5;
      case 6: return player.day6;
      case 7: return player.day7;
      case 8: return player.day8;
      case 9: return player.day9;
      case 10: return player.day10;
      case 11: return player.day11;
      case 12: return player.day12;
      case 13: return player.day13;
      case 14: return player.day14;
      case 15: return player.day15;
      case 16: return player.day16;
      case 17: return player.day17;
      case 18: return player.day18;
      case 19: return player.day19;
      case 20: return player.day20;
      case 21: return player.day21;
      case 22: return player.day22;
      case 23: return player.day23;
      case 24: return player.day24;
      default: return 0;
    }
  };

  const participants = getFilteredData();

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const currentScore = (player) => {
    if (activeTab === 'daily') {
      return playerDailyScore(player, selectedDay);
    }
    return player.total;
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="game-wrapper">
      <div className="leaderboard-card">
        
        {/* Header Badge */}
        <div className="header-badge">
          <h1>Leaderboard</h1>
        </div>

        {/* Corner Icons */}
        <div className="corner-icon icon-left">
          <AlertCircle size={24} />
        </div>
        <div className="corner-icon icon-right">
          <X size={24} />
        </div>

        {/* Main Period Tabs */}
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveTab('daily')}
          >
            Daily
          </button>
          <button 
            className={`tab-btn ${activeTab === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveTab('weekly')}
          >
            Weekly
          </button>
          <button 
            className={`tab-btn ${activeTab === 'monthly' ? 'active' : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            Monthly
          </button>
        </div>

        {/* Sub-Filter for Daily View */}
        {activeTab === 'daily' && (
          <div className="sub-filter-container animate-fade-in">
             <span className="sub-filter-label">Filter:</span>
             <div className="day-dots">
               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map(day => (
                 <button 
                   key={day}
                   className={`day-dot ${selectedDay === day ? 'active' : ''}`}
                   onClick={() => setSelectedDay(day)}
                 >
                   D{day}
                 </button>
               ))}
             </div>
          </div>
        )}

        {/* Scrollable List Content */}
        <div className="rank-list-scroll">
          <div className="rank-list">
            {participants.map((player, index) => (
              <div key={player.id} className="row-group">
                <div 
                  className={`rank-row ${expandedId === player.id ? 'highlight' : ''}`}
                  onClick={() => toggleExpand(player.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="rank-number">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  
                  <div 
                    className="rank-avatar" 
                    style={{ 
                      backgroundColor: index === 0 ? 'var(--accent-neon)' : 'rgba(255,255,255,0.05)',
                      color: index === 0 ? 'var(--bg-deep)' : 'white'
                    }}
                  >
                    <div className={`tier-badge tier-${player.tier.toLowerCase()}`}>
                      {player.tier}
                    </div>
                    {index === 0 ? <Crown size={22} className="crown-icon" /> : <Trophy size={18} className="crown-icon opacity-20" />}
                  </div>
                  
                  <div className="rank-username">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="player-name">{player.name}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600' }}>Streak: {player.streak}D</span>
                    </div>
                  </div>
                  
                  <div className="rank-score">
                    {currentScore(player).toString().padStart(2, '0')}
                  </div>
                  
                  <div className="rank-chevron">
                    {expandedId === player.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {/* Day-wise Marks Breakdown */}
                {expandedId === player.id && (
                  <div className="breakdown-container animate-expand">
                    <div className="breakdown-grid">
                      <div className="breakdown-item">
                        <span className="breakdown-label">Day 1</span>
                        <span className="breakdown-value">{player.day1}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Day 2</span>
                        <span className="breakdown-value">{player.day2}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Day 3</span>
                        <span className="breakdown-value">{player.day3}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Day 4</span>
                        <span className="breakdown-value">{player.day4}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Day 5</span>
                        <span className="breakdown-value">{player.day5}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Day 6</span>
                        <span className="breakdown-value">{player.day6}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Day 7</span>
                        <span className="breakdown-value">{player.day7}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Day 8</span>
                        <span className="breakdown-value">{player.day8}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Day 9</span>
                        <span className="breakdown-value">{player.day9}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">D10</span>
                        <span className="breakdown-value">{player.day10}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">D11</span>
                        <span className="breakdown-value">{player.day11}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">D12</span>
                        <span className="breakdown-value">{player.day12}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">D13</span>
                        <span className="breakdown-value">{player.day13}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">D14</span>
                        <span className="breakdown-value">{player.day14}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">D15</span>
                        <span className="breakdown-value">{player.day15}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">D16</span>
                        <span className="breakdown-value">{player.day16}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">D17</span>
                        <span className="breakdown-value">{player.day17}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">D18</span>
                        <span className="breakdown-value">{player.day18}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">D19</span>
                        <span className="breakdown-value">{player.day19}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">D20</span>
                        <span className="breakdown-value">{player.day20}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">D21</span>
                        <span className="breakdown-value">{player.day21}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">D22</span>
                        <span className="breakdown-value">{player.day22}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">D23</span>
                        <span className="breakdown-value">{player.day23}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">D24</span>
                        <span className="breakdown-value">{player.day24}</span>
                      </div>
                      <div className="breakdown-item" style={{ gridColumn: 'span 3', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', marginTop: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                           <span className="breakdown-label">Total Points</span>
                           <span className="breakdown-value text-neon">{player.total}</span>
                        </div>
                      </div>
                    </div>
                    
                    {player.total < 200 && (
                      <div className="encouragement-banner">
                        <Crown size={14} className="text-neon" />
                        <span>Only <b>{200 - player.total}</b> more points to unlock <span className="text-neon">S RANK</span>! Keep pushing!</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="card-footer">
          <div className="footer-status">
             <div className="status-indicator" />
             <span className="status-text">Last Sync: Just now</span>
          </div>
          <div className="footer-actions">
             <button className="icon-btn" onClick={handleRefresh}>
                <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
             </button>
             <button className="share-btn">
                <Share2 size={18} />
                <span>Share Results</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

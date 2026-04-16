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

const App = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedDay, setSelectedDay] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Real data from spreadsheet
  const rawData = [
    { id: 1, name: 'Naman Khairwar', streak: 2, bonus: 10, day1: 15, day2: 14, day3: 8, day4: 7, day5: 0, day6: 9, day7: 8, day8: 9, day9: 0, day10: 0, tier: 'S' },
    { id: 2, name: 'Kunal Shetty', streak: 2, bonus: 8, day1: 10, day2: 8, day3: 0, day4: 6, day5: 10, day6: 14, day7: 9, day8: 9, day9: 13, day10: 0, tier: 'A' },
    { id: 3, name: 'Saheb Singh Sandhu', streak: 0, bonus: 10, day1: 13, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, tier: 'A' },
    { id: 4, name: 'Eshan Mohammed', streak: 2, bonus: 10, day1: 10, day2: 10, day3: 0, day4: 7, day5: 14, day6: 0, day7: 14, day8: 13, day9: 0, day10: 0, tier: 'A' },
    { id: 5, name: 'Aaryan Patwardhan', streak: 0, bonus: 7, day1: 7, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, tier: 'B' },
    { id: 6, name: 'Deetya Shivathaya', streak: 2, bonus: 9, day1: 9, day2: 9, day3: 7, day4: 10, day5: 8, day6: 0, day7: 7, day8: 9, day9: 9, day10: 0, tier: 'B' },
    { id: 7, name: 'Lakshya Somani', streak: 2, bonus: 8, day1: 8, day2: 9, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, tier: 'B' },
    { id: 8, name: 'Aaryan Raorane', streak: 2, bonus: 7, day1: 7, day2: 7, day3: 10, day4: 14, day5: 12, day6: 8, day7: 12, day8: 0, day9: 8, day10: 0, tier: 'C' },
    { id: 9, name: 'rose', streak: 0, bonus: 7, day1: 7, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, tier: 'C' },
    { id: 10, name: 'Devesh Sadashiv Hegde', streak: 2, bonus: 8, day1: 10, day2: 10, day3: 6, day4: 8, day5: 8, day6: 12, day7: 0, day8: 0, day9: 0, day10: 0, tier: 'C' },
    { id: 11, name: 'Mansi Bansal', streak: 2, bonus: 7, day1: 7, day2: 9, day3: 12, day4: 10, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, tier: 'D' },
    { id: 12, name: 'Riya Gupta', streak: 2, bonus: 8, day1: 8, day2: 8, day3: 6, day4: 8, day5: 8, day6: 8, day7: 9, day8: 14, day9: 10, day10: 0, tier: 'D' },
    { id: 13, name: 'Ananya Raut', streak: 1, bonus: 0, day1: 0, day2: 9, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, tier: 'D' },
    { id: 14, name: 'Rehan Shashi', streak: 1, bonus: 0, day1: 0, day2: 8, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, tier: 'D' },
    { id: 15, name: 'Prachi Matai', streak: 1, bonus: 0, day1: 0, day2: 8, day3: 0, day4: 10, day5: 8, day6: 0, day7: 8, day8: 0, day9: 0, day10: 0, tier: 'D' },
    { id: 16, name: 'Shreya Ravindra Desai', streak: 1, bonus: 0, day1: 0, day2: 8, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, tier: 'D' },
    { id: 17, name: 'Vedant', streak: 1, bonus: 0, day1: 0, day2: 6, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, tier: 'D' },
    { id: 18, name: 'Guruprasad Tukaram Shinde', streak: 1, bonus: 0, day1: 0, day2: 8, day3: 7, day4: 9, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, tier: 'D' },
    { id: 19, name: 'Nitin', streak: 1, bonus: 0, day1: 0, day2: 0, day3: 12, day4: 7, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, tier: 'D' },
    { id: 20, name: 'Dhanvantri Panjwani', streak: 0, bonus: 0, day1: 0, day2: 0, day3: 0, day4: 2, day5: 0, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, tier: 'D' },
    { id: 21, name: 'Ananya Bhavesh Raut', streak: 0, bonus: 0, day1: 0, day2: 0, day3: 0, day4: 0, day5: 0, day6: 7, day7: 0, day8: 0, day9: 0, day10: 0, tier: 'D' },
    { id: 22, name: 'Mariam Toofani', streak: 0, bonus: 0, day1: 0, day2: 0, day3: 0, day4: 0, day5: 0, day6: 9, day7: 0, day8: 0, day9: 0, day10: 0, tier: 'D' },
    { id: 23, name: 'Ayesha Toofani', streak: 0, bonus: 0, day1: 0, day2: 0, day3: 0, day4: 0, day5: 8, day6: 0, day7: 0, day8: 0, day9: 0, day10: 0, tier: 'D' },
    { id: 24, name: 'Devesh Hegde', streak: 2, bonus: 0, day1: 0, day2: 11, day3: 0, day4: 0, day5: 0, day6: 0, day7: 13, day8: 7, day9: 8, day10: 0, tier: 'D' },
  ];

  const calculateTier = (score) => {
    if (score >= 50) return 'S';
    if (score >= 40) return 'A';
    if (score >= 25) return 'B';
    if (score >= 10) return 'C';
    return 'D';
  };

  const processedParticipants = useMemo(() => {
    return rawData.map(p => {
      const total = p.day1 + p.day2 + p.day3 + p.day4 + p.day5 + p.day6 + p.day7 + p.day8 + p.day9 + p.day10;
      return {
        ...p,
        total,
        tier: calculateTier(total)
      };
    });
  }, []);

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
               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(day => (
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
                        <span className="breakdown-label">Day 10</span>
                        <span className="breakdown-value">{player.day10}</span>
                      </div>
                      <div className="breakdown-item" style={{ gridColumn: 'span 2', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', marginTop: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                           <span className="breakdown-label">Total</span>
                           <span className="breakdown-value text-neon">{player.total}</span>
                        </div>
                      </div>
                    </div>
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

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
    { id: 1, name: 'Naman Khairwar', streak: 4, bonus: 5, day1: 15, day2: 14, day3: 8, day4: 7, tier: 'S' },
    { id: 2, name: 'Kunal Shetty', streak: 3, bonus: 2, day1: 10, day2: 8, day3: 0, day4: 6, tier: 'A' },
    { id: 3, name: 'Saheb Singh Sandhu', streak: 1, bonus: 3, day1: 13, day2: 0, day3: 0, day4: 0, tier: 'A' },
    { id: 4, name: 'Eshan Mohammed', streak: 3, bonus: 0, day1: 10, day2: 10, day3: 0, day4: 7, tier: 'A' },
    { id: 5, name: 'Aaryan Patwardhan', streak: 1, bonus: 0, day1: 7, day2: 0, day3: 0, day4: 0, tier: 'B' },
    { id: 6, name: 'Deetya Shivathaya', streak: 4, bonus: 0, day1: 9, day2: 9, day3: 7, day4: 10, tier: 'B' },
    { id: 7, name: 'Lakshya Somani', streak: 2, bonus: 0, day1: 8, day2: 9, day3: 0, day4: 0, tier: 'B' },
    { id: 8, name: 'Aaryan Raorane', streak: 4, bonus: 0, day1: 7, day2: 7, day3: 10, day4: 14, tier: 'C' },
    { id: 9, name: 'rose', streak: 1, bonus: 0, day1: 7, day2: 0, day3: 0, day4: 0, tier: 'C' },
    { id: 10, name: 'Devesh Sadashiv Hegde', streak: 4, bonus: 0, day1: 10, day2: 10, day3: 6, day4: 8, tier: 'C' },
    { id: 11, name: 'Mansi Bansal', streak: 4, bonus: 0, day1: 7, day2: 9, day3: 12, day4: 10, tier: 'D' },
    { id: 12, name: 'Riya Gupta', streak: 4, bonus: 0, day1: 8, day2: 8, day3: 6, day4: 8, tier: 'D' },
    { id: 13, name: 'Ananya Raut', streak: 1, bonus: 0, day1: 0, day2: 9, day3: 0, day4: 0, tier: 'D' },
    { id: 14, name: 'Rehan Shashi', streak: 1, bonus: 0, day1: 0, day2: 8, day3: 0, day4: 0, tier: 'D' },
    { id: 15, name: 'Prachi Matai', streak: 2, bonus: 0, day1: 0, day2: 8, day3: 0, day4: 10, tier: 'D' },
    { id: 16, name: 'Shreya Ravindra Desai', streak: 1, bonus: 0, day1: 0, day2: 8, day3: 0, day4: 0, tier: 'D' },
    { id: 17, name: 'Vedant', streak: 1, bonus: 0, day1: 0, day2: 6, day3: 0, day4: 0, tier: 'D' },
    { id: 18, name: 'Guruprasad Tukaram Shinde', streak: 3, bonus: 0, day1: 0, day2: 8, day3: 7, day4: 9, tier: 'D' },
    { id: 19, name: 'Nitin', streak: 2, bonus: 0, day1: 0, day2: 0, day3: 12, day4: 7, tier: 'D' },
    { id: 20, name: 'Dhanvantri Panjwani', streak: 1, bonus: 0, day1: 0, day2: 0, day3: 0, day4: 2, tier: 'D' },
  ];

  const processedParticipants = useMemo(() => {
    return rawData.map(p => ({
      ...p,
      total: p.day1 + p.day2 + p.day3 + p.day4
    }));
  }, []);

  const getFilteredData = () => {
    let list = [...processedParticipants];
    if (activeTab === 'daily') {
      list.sort((a, b) => {
        const scoreA = selectedDay === 1 ? a.day1 : selectedDay === 2 ? a.day2 : selectedDay === 3 ? a.day3 : a.day4;
        const scoreB = selectedDay === 1 ? b.day1 : selectedDay === 2 ? b.day2 : selectedDay === 3 ? b.day3 : b.day4;
        return scoreB - scoreA;
      });
    } else {
      list.sort((a, b) => b.total - a.total);
    }
    return list;
  };

  const participants = getFilteredData();

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const currentScore = (player) => {
    if (activeTab === 'daily') {
      return selectedDay === 1 ? player.day1 : selectedDay === 2 ? player.day2 : selectedDay === 3 ? player.day3 : player.day4;
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
               {[1, 2, 3, 4].map(day => (
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
                      <div className="breakdown-item" style={{ gridColumn: 'span 4', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', marginTop: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                           <span className="breakdown-label">Total Aggregate</span>
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
             <span className="status-text">Last Sync: 2m ago</span>
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

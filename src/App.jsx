import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Clock, 
  Search
} from 'lucide-react';

// Components
import Podium from './components/Podium';
import LeaderboardTable from './components/LeaderboardTable';
import Sidebar from './components/Sidebar';

// Data
import { mockParticipants, processLeaderboardData } from './data/mockData';

const App = () => {
  const [data] = useState(processLeaderboardData(mockParticipants));
  const [activeTab, setActiveTab] = useState('LIVE_CONTEST');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="grid-overlay" />
      
      <Sidebar />

      <main className="main-wrapper">
        {/* Top Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
          <nav style={{ display: 'flex', gap: '32px' }}>
            {['LIVE_CONTEST', 'ARCHIVE', 'TEAMS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`header-tab ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#0a0c12', border: '1px solid #1a1c24', borderRadius: '4px' }}>
              <Clock size={14} color="#00f0ff" />
              <span className="font-mono" style={{ fontSize: '13px', fontWeight: 'bold' }}>04:12:00</span>
            </div>
            <Bell size={20} color="#4a5568" style={{ cursor: 'pointer' }} />
            <button className="btn-cyan">REGISTER</button>
          </div>
        </header>

        {/* Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn-outline-green" style={{ borderColor: '#1a1c24', color: '#fff' }}>VIEW_REPLAY</button>
            <button className="btn-outline-green">CHALLENGE_GHOST</button>
          </div>
          <div className="font-mono" style={{ fontSize: '10px', color: '#2d3748', letterSpacing: '0.1em' }}>
            CONTEST_ID: OCT_2024_08_12
          </div>
        </div>

        {/* Podium */}
        <div style={{ marginBottom: '64px' }}>
          <Podium winners={data.slice(0, 3)} />
        </div>

        {/* List Section */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
              <h2 className="font-display" style={{ fontSize: '18px', letterSpacing: '0.2em' }}>GLOBAL_CONTINGENT</h2>
              <span className="font-mono" style={{ fontSize: '10px', color: '#4a5568' }}>// RANKS 04-50</span>
            </div>
            
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#4a5568' }} size={14} />
              <input 
                type="text" 
                placeholder="FILTER_PLAYERS..."
                style={{ background: '#0a0c12', border: '1px solid #1a1c24', padding: '10px 16px 10px 40px', borderRadius: '2px', color: '#fff', fontSize: '10px', width: '260px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <LeaderboardTable participants={filteredData} />
          
          <button style={{ width: '100%', marginTop: '32px', padding: '16px', background: 'none', border: '1px solid #1a1c24', color: '#4a5568', fontFamily: 'Orbitron', fontSize: '10px', letterSpacing: '0.2em', cursor: 'pointer' }}>
            LOAD_ADDITIONAL_DATA (44_REMAINING)
          </button>
        </section>

        {/* Footer */}
        <footer style={{ marginTop: '100px', paddingTop: '48px', borderTop: '1px solid #1a1c24', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: 0.5 }}>
          <div style={{ display: 'flex', gap: '32px', fontSize: '9px', fontFamily: 'Orbitron', letterSpacing: '0.1em' }}>
            <a href="#" style={{ color: '#4a5568', textDecoration: 'none' }}>SYSTEM_STATUS</a>
            <a href="#" style={{ color: '#4a5568', textDecoration: 'none' }}>API_DOCS</a>
            <a href="#" style={{ color: '#4a5568', textDecoration: 'none' }}>SECURITY</a>
          </div>
          <p className="font-mono" style={{ fontSize: '9px', color: '#2d3748' }}>
            © 2024 KINETIC_TERMINAL // ENCRYPTED CONNECTION
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;

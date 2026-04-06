import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { Trophy, Activity, Sun, Moon, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// Components
import Podium from './components/Podium';
import LeaderboardTable from './components/LeaderboardTable';
import { HeaderStats, TodayTopPerformer } from './components/Highlights';

// Data & Utils
import { mockParticipants, processLeaderboardData } from './data/mockData';
import { parseSheetCSV } from './utils/csvParser';

// 📋 STEP 1: Replace this with your "Publish to Web" CSV Link!
const SHEET_URL = "YOUR_GOOGLE_SHEET_CSV_URL_HERE";

const App = () => {
  const [data, setData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [error, setError] = useState(null);

  // Sync Theme with DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Real Data Fetch Logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!SHEET_URL || SHEET_URL.includes("YOUR")) {
          setData(processLeaderboardData(mockParticipants));
          setLoading(false);
          return;
        }

        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        const parsedData = parseSheetCSV(csvText);
        const processed = processLeaderboardData(parsedData);
        
        setData(processed);
        setLastUpdate(new Date());
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Unable to sync live sheet.");
        if (data.length === 0) setData(processLeaderboardData(mockParticipants));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); 
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    if (!data.length) return { total: 0, avg: 0, topToday: null };
    
    const totalParticipants = data.length;
    const avgScore = data.reduce((a, b) => a + b.total, 0) / totalParticipants;
    const sortedByTotal = [...data].sort((a,b) => b.total - a.total);
    const topToday = { 
      ...sortedByTotal[0], 
      todayScore: sortedByTotal[0].total 
    };

    return { total: totalParticipants, avg: avgScore, topToday };
  }, [data]);

  if (loading) return (
    <div className="loading-screen">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
        <Trophy size={48} color="var(--devhub-green)" />
      </motion.div>
      <p className="font-outfit uppercase tracking-widest font-black text-xs text-neon">Initializing DevHub Oracle...</p>
    </div>
  );

  return (
    <div className="lb-root">
      <header className="lb-header">
        <div className="brand-group">
          <div className="brand-icon glass animate-float">
            <Trophy size={32} color="var(--devhub-green)" fill="rgba(16, 255, 156, 0.1)" />
          </div>
          <div className="brand-meta">
            <div className="brand-badge glass">DEVHUB PRESENTATION</div>
            <h1 className="brand-title text-grad-neon">Pro Coding Contest</h1>
            <div className="sync-badge">
              <span className="dot animate-pulse"></span>
              <span className="font-outfit uppercase font-black tracking-widest text-[0.65rem] text-neon">Live Streaming Data · Season 1</span>
            </div>
          </div>
        </div>
        
        <div className="h-actions">
          <button onClick={toggleTheme} className="theme-toggle-btn glass">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="active-pill glass-pill">
            <div className="avatar-stack">
              <span className="count-dot"></span>
              <Activity size={14} color="var(--devhub-green)" />
            </div>
            <span className="font-black text-[0.7rem] uppercase tracking-wider text-neon opacity-70">Contest Live</span>
          </div>
        </div>
      </header>

      <main>
        <TodayTopPerformer performer={stats.topToday} />
        <HeaderStats totalParticipants={stats.total} avgScore={stats.avg} lastUpdate={format(lastUpdate, 'HH:mm:ss')} />
        <Podium winners={data.slice(0, 3)} />
        <LeaderboardTable participants={data} />
      </main>

      <footer className="footer-vibe">
        <div className="footer-line"></div>
        <p>Engineered by <span className="font-black text-neon">DEVHUB</span> · 2026 Merit Excellence</p>
      </footer>

      <style>{`
        .loading-screen { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.5rem; background: var(--bg-main); }
        .lb-root { padding-bottom: 6rem; }
        .lb-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5rem; margin-top: 1rem; }
        .brand-group { display: flex; align-items: center; gap: 2rem; }
        .brand-icon { width: 75px; height: 75px; display: flex; align-items: center; justify-content: center; border-radius: 1.75rem; border: 1px solid var(--border-color); background: var(--bg-card); }
        .brand-badge { color: var(--devhub-green); font-size: 0.65rem; padding: 0.2rem 0.7rem; border-radius: 6px; margin-bottom: 0.25rem; font-weight: 950; }
        .brand-title { font-size: 3.5rem; font-weight: 950; line-height: 1; margin: 0.25rem 0; letter-spacing: -0.04em; }
        
        .h-actions { display: flex; align-items: center; gap: 1rem; }
        .dot { width: 10px; height: 10px; background: var(--devhub-green); border-radius: 50%; box-shadow: 0 0 15px var(--accent-glow); }

        .active-pill { padding: 0.85rem 1.75rem !important; border-color: var(--border-color) !important; box-shadow: 0 10px 30px var(--shadow-color) !important; }
        .count-dot { position: absolute; top: -4px; right: -4px; width: 6px; height: 6px; background: var(--devhub-green); border-radius: 50%; border: 1px solid var(--bg-main); box-shadow: 0 0 5px var(--devhub-green); }

        .footer-vibe { margin-top: 7rem; text-align: center; color: var(--text-muted); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
        .footer-line { width: 120px; height: 3px; background: linear-gradient(to right, transparent, var(--devhub-green), transparent); margin: 0 auto 2rem; opacity: 0.3; }

        @media (max-width: 850px) {
          .lb-header { flex-direction: column; align-items: center; text-align: center; gap: 2rem; margin-bottom: 3rem; }
          .brand-group { flex-direction: column; align-items: center; gap: 1rem; }
          .h-actions { order: -1; width: 100%; justify-content: space-between; margin-bottom: 2rem; }
          .brand-title { font-size: 2rem; }
          .brand-icon { width: 60px; height: 60px; }
        }
      `}</style>
    </div>
  );
};

export default App;

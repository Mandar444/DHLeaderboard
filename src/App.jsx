import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { Trophy, Activity, LayoutGrid, Search, ListFilter } from 'lucide-react';
import Podium from './components/Podium';
import LeaderboardTable from './components/LeaderboardTable';
import { HeaderStats, TodayTopPerformer } from './components/Highlights';
import { mockParticipants, processLeaderboardData } from './data/mockData';
import { parseSheetCSV } from './utils/csvParser';

// 📋 STEP 1: Replace this with your "Publish to Web" CSV Link!
const SHEET_URL = "YOUR_GOOGLE_SHEET_CSV_URL_HERE";

const App = () => {
  const [data, setData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Real Data Fetch Logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!SHEET_URL || SHEET_URL.includes("YOUR")) {
          // Use Mock Data if no URL is provided
          console.log("No URL: Using mock data");
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
        setError("Unable to sync live sheet. Showing cached data.");
        // Fallback to mock data on error so UI doesn't break
        if (data.length === 0) setData(processLeaderboardData(mockParticipants));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Poll every 30s as per PRD
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    if (!data.length) return { total: 0, avg: 0, topToday: null };
    
    const totalParticipants = data.length;
    // Calculate average based on Total scores
    const avgScore = data.reduce((a, b) => a + b.total, 0) / totalParticipants;
    
    // Find highest overall scorer for the "Alpha" card
    const sortedByTotal = [...data].sort((a,b) => b.total - a.total);
    const topToday = { 
      ...sortedByTotal[0], 
      todayScore: sortedByTotal[0].total // Show the total score as the main metric
    };

    return { total: totalParticipants, avg: avgScore, topToday };
  }, [data]);

  if (loading) return (
    <div className="loading-screen">
      <div className="loader"></div>
      <p>Syncing Leaderboard...</p>
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
            <div className="brand-badge">DEVHUB PRESENTATION</div>
            <h1 className="brand-title text-grad-devhub">Pro Coding Contest</h1>
            <div className="sync-badge">
              <span className="dot animate-pulse"></span>
              <span className="font-outfit uppercase font-black tracking-widest text-[0.65rem] text-[var(--devhub-green)]">Live Streaming Data · Season 1</span>
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
            <span className="font-black text-[0.7rem] uppercase tracking-wider text-[var(--devhub-green)] opacity-70">Contest Live</span>
          </div>
        </div>
      </header>

      <main>
        {/* Prismatic Alpha Feature Card */}
        <TodayTopPerformer performer={stats.topToday} />

        {/* Global Performance Metris */}
        <HeaderStats 
          totalParticipants={stats.total} 
          avgScore={stats.avg} 
          lastUpdate={format(lastUpdate, 'HH:mm:ss')} 
        />

        {/* Cinematic Podium */}
        <Podium winners={data.slice(0, 3)} />

        {/* Standard Participation Table */}
        <LeaderboardTable participants={data} />
      </main>

      <footer className="footer-vibe">
        <div className="footer-line"></div>
        <p>Engineered by <span className="font-black text-[var(--devhub-green)]">DEVHUB</span> · 2026 Merit Excellence</p>
      </footer>

      <style>{`
        .lb-root { padding-bottom: 6rem; }
        .lb-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5rem; margin-top: 1rem; }
        .brand-group { display: flex; align-items: center; gap: 2rem; }
        .brand-icon { width: 72px; height: 72px; display: flex; align-items: center; justify-content: center; border-radius: 1.75rem; background: white; box-shadow: 0 15px 35px rgba(99, 102, 241, 0.15); }
        .brand-title { font-size: 3.25rem; font-weight: 900; line-height: 1; margin: 0.5rem 0; letter-spacing: -0.04em; }
        .sync-badge { display: flex; align-items: center; gap: 0.75rem; }
        .dot { width: 10px; height: 10px; background: var(--devhub-green); border-radius: 50%; box-shadow: 0 0 12px rgba(99, 102, 241, 0.6); }
        .h-actions { display: flex; align-items: center; gap: 1rem; }
        .theme-toggle-btn { padding: 0.5rem; border-radius: 50%; cursor: pointer; border: none; background: rgba(255,255,255,0.1); }

        .active-pill { padding: 0.85rem 1.75rem !important; background: rgba(255,255,255,0.8) !important; border: 1px solid rgba(99, 102, 241, 0.1) !important; box-shadow: 0 10px 20px rgba(0,0,0,0.03) !important; }
        .avatar-stack { position: relative; }
        .count-dot { position: absolute; top: -4px; right: -4px; width: 6px; height: 6px; background: #22c55e; border-radius: 50%; border: 1px solid white; }

        .footer-vibe { margin-top: 7rem; text-align: center; color: #94a3b8; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
        .footer-line { width: 120px; height: 3px; background: linear-gradient(to right, transparent, var(--devhub-green), transparent); margin: 0 auto 2rem; }

        @media (max-width: 850px) {
          .lb-header { flex-direction: column; align-items: center; text-align: center; gap: 2rem; margin-bottom: 3rem; }
          .brand-group { flex-direction: column; align-items: center; gap: 1rem; }
          .brand-title { font-size: 1.75rem; text-align: center; }
          .sync-badge { justify-content: center; }
          .active-pill { display: none; }
          .brand-icon { width: 60px; height: 60px; border-radius: 1.25rem; }
        }
      `}</style>
    </div>
  );
};

export default App;

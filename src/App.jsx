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
    
    // Using Day 3 as "Today" for calculation
    const totalParticipants = data.length;
    const day3Scores = data.map(p => p.scores.day3);
    const avgScore = day3Scores.reduce((a, b) => a + b, 0) / totalParticipants;
    
    // Find highest scorer specifically for "Today" (Day 3)
    const sortedToday = [...data].sort((a,b) => b.scores.day3 - a.scores.day3);
    const topToday = { ...sortedToday[0], todayScore: sortedToday[0].scores.day3 };

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
            <Trophy size={32} color="#6366f1" fill="rgba(99, 102, 241, 0.1)" />
          </div>
          <div className="brand-meta">
            <div className="brand-badge">DEVHUB PRESENTATION</div>
            <h1 className="brand-title text-grad-devhub">Pro Coding Contest</h1>
            <div className="sync-badge">
              <span className="dot animate-pulse"></span>
              <span className="font-outfit uppercase font-black tracking-widest text-[0.65rem] text-indigo-500">Live Streaming Data · Season 1</span>
            </div>
          </div>
        </div>
        <div className="active-pill glass-pill">
          <div className="avatar-stack">
            <span className="count-dot"></span>
            <Activity size={14} color="#6366f1" />
          </div>
          <span className="font-black text-[0.7rem] uppercase tracking-wider text-indigo-600/60">Contest Live</span>
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
        <p>Engineered by <span className="font-black text-indigo-600">DEVHUB</span> · 2026 Merit Excellence</p>
      </footer>

      <style>{`
        .lb-root { padding-bottom: 6rem; }
        .lb-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5rem; margin-top: 1rem; }
        .brand-group { display: flex; align-items: center; gap: 2rem; }
        .brand-icon { width: 72px; height: 72px; display: flex; align-items: center; justify-content: center; border-radius: 1.75rem; background: white; box-shadow: 0 15px 35px rgba(99, 102, 241, 0.15); }
        .brand-title { font-size: 3.25rem; font-weight: 900; line-height: 1; margin: 0.5rem 0; letter-spacing: -0.04em; }
        .sync-badge { display: flex; align-items: center; gap: 0.75rem; }
        .dot { width: 10px; height: 10px; background: #6366f1; border-radius: 50%; box-shadow: 0 0 12px rgba(99, 102, 241, 0.6); }

        .active-pill { padding: 0.85rem 1.75rem !important; background: rgba(255,255,255,0.8) !important; border: 1px solid rgba(99, 102, 241, 0.1) !important; box-shadow: 0 10px 20px rgba(0,0,0,0.03) !important; }
        .avatar-stack { position: relative; }
        .count-dot { position: absolute; top: -4px; right: -4px; width: 6px; height: 6px; background: #22c55e; border-radius: 50%; border: 1px solid white; }

        .footer-vibe { margin-top: 7rem; text-align: center; color: #94a3b8; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
        .footer-line { width: 120px; height: 3px; background: linear-gradient(to right, transparent, rgba(99,102,241,0.2), transparent); margin: 0 auto 2rem; }

        @media (max-width: 850px) {
          .lb-header { flex-direction: column; align-items: flex-start; gap: 3rem; }
          .brand-title { font-size: 2.25rem; }
        }
      `}</style>
    </div>
  );
};

export default App;

/**
 * Custom CSV Parser for Day 1 Spreadsheet Layout
 */
export const parseSheetCSV = (csvText) => {
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  
  return lines.slice(1).map((line, index) => {
    const values = line.split(',').map(v => v.trim());
    
    // Mapping precisely based on Image Layout:
    // A: Name (0), B: Day (1), C: Bonus (2), D: Streak (3), E: Marks (4), F: Total (5)
    
    const day1Score = parseInt(values[4]) || 0;
    const bonus = parseInt(values[2]) || 0;
    const streak = parseInt(values[3]) || 0;

    return {
      id: index,
      name: values[0] || `Unknown Participant`,
      scores: {
        day1: day1Score,
        day2: 0,
        day3: 0,
      },
      bonus: bonus,
      streak: streak,
      // The processLeaderboardData function will calculate the Total
      lastSubmitted: new Date().toISOString(), // Fallback to current time
    };
  });
};

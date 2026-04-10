export const mockParticipants = [
  { id: 1, name: "Naman Khairwar", streak: 2, bonus: 10, day1: 15, day2: 14, day3: 8, day4: 7, day5: 0, day6: 9, day7: 0, tier: "S" },
  { id: 2, name: "Kunal Shetty", streak: 2, bonus: 8, day1: 10, day2: 8, day3: 0, day4: 6, day5: 10, day6: 14, day7: 0, tier: "A" },
  { id: 3, name: "Saheb Singh Sandhu", streak: 0, bonus: 10, day1: 13, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, tier: "A" },
  { id: 4, name: "Eshan Mohammed", streak: 2, bonus: 10, day1: 10, day2: 10, day3: 0, day4: 7, day5: 14, day6: 0, day7: 0, tier: "A" },
  { id: 5, name: "Aaryan Patwardhan", streak: 0, bonus: 7, day1: 7, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, tier: "B" },
  { id: 6, name: "Deetya Shivathaya", streak: 2, bonus: 9, day1: 9, day2: 9, day3: 7, day4: 10, day5: 8, day6: 0, day7: 0, tier: "B" },
  { id: 7, name: "Lakshya Somani", streak: 2, bonus: 8, day1: 8, day2: 9, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, tier: "B" },
  { id: 8, name: "Aaryan Raorane", streak: 2, bonus: 7, day1: 7, day2: 7, day3: 10, day4: 14, day5: 12, day6: 8, day7: 0, tier: "C" },
];

export const processLeaderboardData = (data) => {
  return [...data].sort((a, b) => b.total - a.total);
};

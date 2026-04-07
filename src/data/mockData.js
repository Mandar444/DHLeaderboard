export const mockParticipants = [
  { id: 1, name: "CYBER_PHANTOM_99", streak: "12D", avg_speed: "124MS", total: 18442, rank: 1 },
  { id: 2, name: "RECURSION_KING", streak: "8D", avg_speed: "142MS", total: 17902, rank: 2 },
  { id: 3, name: "VOID_LOGGER", streak: "5D", avg_speed: "156MS", total: 16110, rank: 3 },
  { id: 4, name: "BIT_CRUSHER_X", streak: "12D", avg_speed: "165MS", total: 15920, rank: 4 },
  { id: 5, name: "SYNTAX_ERROR_9", streak: "2D", avg_speed: "192MS", total: 15844, rank: 5 },
  { id: 6, name: "LOGIC_GIRL_PRO", streak: "8D", avg_speed: "178MS", total: 15100, rank: 6 },
  { id: 7, name: "RECON_UNIT_01", streak: "15D", avg_speed: "110MS", total: 14890, rank: 7 },
  { id: 8, name: "GHOST_SHELL", streak: "4D", avg_speed: "185MS", total: 14200, rank: 8 },
];

export const processLeaderboardData = (data) => {
  return [...data].sort((a, b) => b.total - a.total);
};

import { subDays } from 'date-fns';

export const mockParticipants = [
  { id: 1, name: "Naman Khairwar", scores: { day1: 10, day2: 0, day3: 0 }, bonus: 5, streak: 1, lastSubmitted: subDays(new Date(), 0).toISOString() },
  { id: 2, name: "Saheb Singh Sar", scores: { day1: 10, day2: 0, day3: 0 }, bonus: 3, streak: 1, lastSubmitted: subDays(new Date(), 0).toISOString() },
  { id: 3, name: "Kunal Shetty", scores: { day1: 8, day2: 0, day3: 0 }, bonus: 2, streak: 1, lastSubmitted: subDays(new Date(), 0).toISOString() },
  { id: 4, name: "Eshan Mohammad", scores: { day1: 10, day2: 0, day3: 0 }, bonus: 0, streak: 1, lastSubmitted: subDays(new Date(), 0).toISOString() },
  { id: 5, name: "Devesh Sadashiv", scores: { day1: 10, day2: 0, day3: 0 }, bonus: 0, streak: 1, lastSubmitted: subDays(new Date(), 0).toISOString() },
  { id: 6, name: "Deetya Shivathaya", scores: { day1: 9, day2: 0, day3: 0 }, bonus: 0, streak: 1, lastSubmitted: subDays(new Date(), 0).toISOString() },
  { id: 7, name: "Lakshya Somani", scores: { day1: 8, day2: 0, day3: 0 }, bonus: 0, streak: 1, lastSubmitted: subDays(new Date(), 0).toISOString() },
  { id: 8, name: "Riya Gupta", scores: { day1: 8, day2: 0, day3: 0 }, bonus: 0, streak: 1, lastSubmitted: subDays(new Date(), 0).toISOString() },
  { id: 9, name: "Aaryan Patwardhan", scores: { day1: 7, day2: 0, day3: 0 }, bonus: 0, streak: 1, lastSubmitted: subDays(new Date(), 0).toISOString() },
  { id: 10, name: "Aaryan Raorane", scores: { day1: 7, day2: 0, day3: 0 }, bonus: 0, streak: 1, lastSubmitted: subDays(new Date(), 0).toISOString() },
  { id: 11, name: "rose", scores: { day1: 7, day2: 0, day3: 0 }, bonus: 0, streak: 1, lastSubmitted: subDays(new Date(), 0).toISOString() },
  { id: 12, name: "Mansi Bansal", scores: { day1: 7, day2: 0, day3: 0 }, bonus: 0, streak: 1, lastSubmitted: subDays(new Date(), 0).toISOString() },
];

export const processLeaderboardData = (data) => {
  return data
    .map(p => {
      const total = Object.values(p.scores).reduce((a, b) => a + b, 0) + p.bonus + (p.streak >= 3 ? p.streak * 2 : 0);
      return { ...p, total };
    })
    .sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      return new Date(a.lastSubmitted) - new Date(b.lastSubmitted);
    });
};

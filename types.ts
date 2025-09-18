 export interface GrowthMeasurement {
  id: string;
  date: string;               // ISO date string (UTC 00:00)
  ageInDays: number;
  weightKg: number;
  heightCm: number;
  headCm: number;
  weightPercentile?: number;
  heightPercentile?: number;
  headPercentile?: number;
 }
 export interface BabyProfile {
  id: string;
  name: string;
  birthDate: string;          // ISO date string
  gender: 'male' | 'female';
 }
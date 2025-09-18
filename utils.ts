/* import dayjs from 'dayjs';
 export const kgToLb = (kg: number): number => kg * 2.20462;
 export const lbToKg = (lb: number): number => lb / 2.20462;
 export const cmToIn = (cm: number): number => cm / 2.54;
 export const inToCm = (inch: number): number => inch * 2.54;
 export const calcAgeInDays = (birthDate: string, date: string): number => {
  const start = dayjs(birthDate);
  const end = dayjs(date);
  return end.diff(start, 'day');
 };*/

 import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// Conversions (SI <-> imperial)
export const kgToLb = (kg: number): number => kg / 0.45359237; // exact factor
export const lbToKg = (lb: number): number => lb * 0.45359237;

export const cmToIn = (cm: number): number => cm / 2.54;
export const inToCm = (inch: number): number => inch * 2.54;

/**
 * Calculate age in days between birthDate and measurementDate.
 * Both should be ISO date strings (YYYY-MM-DD or full ISO).
 * Normalizes to UTC midnight to avoid timezone off-by-one issues.
 */
export const calcAgeInDays = (birthDate: string, measurementDate: string): number => {
  const start = dayjs.utc(birthDate).startOf('day');
  const end = dayjs.utc(measurementDate).startOf('day');
  const diff = end.diff(start, 'day');
  return Math.max(0, diff); // clamp to non-negative
};

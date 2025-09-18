 import dayjs from 'dayjs';
 export const kgToLb = (kg: number): number => kg * 2.20462;
 export const lbToKg = (lb: number): number => lb / 2.20462;
 export const cmToIn = (cm: number): number => cm / 2.54;
 export const inToCm = (inch: number): number => inch * 2.54;
 export const calcAgeInDays = (birthDate: string, date: string): number => {
  const start = dayjs(birthDate);
  const end = dayjs(date);
  return end.diff(start, 'day');
 };
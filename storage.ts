import AsyncStorage from '@react-native-async-storage/async-storage';
 import { GrowthMeasurement } from './types';
const STORAGE_KEY = 'growth/v1/measurements';
 export const saveMeasurements = async (data: GrowthMeasurement[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Save error', e);
  }
 };
 export const loadMeasurements = async (): Promise<GrowthMeasurement[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Load error', e);
    return [];
  }
 };
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

 import React, { useEffect, useState } from 'react';
 import { SafeAreaView, ScrollView } from 'react-native';
 import MeasurementForm from './MeasurementForm';
 import GrowthChart from './GrowthChart';
 import History from './History';
 import { GrowthMeasurement, BabyProfile } from './types';
 import { saveMeasurements, loadMeasurements } from './storage';
 const baby: BabyProfile = {
  id: '1',
  name: 'Baby A',
  birthDate: '2024-01-01',
  gender: 'female',
 };


/*function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <Text>Dhruv</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;*/
export default function App() {
  const [measurements, setMeasurements] = useState<GrowthMeasurement[]>([]);
  useEffect(() => {
    (async () => {
      const stored = await loadMeasurements();
      setMeasurements(stored);
    })();
  }, []);
  const addMeasurement = async (m: GrowthMeasurement) => {
    const updated = [...measurements, m];
    setMeasurements(updated);
    await saveMeasurements(updated);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <MeasurementForm onSave={addMeasurement} babyBirthDate={baby.birthDate} />
        {/*<GrowthChart data={measurements} />*/}
        <History data={measurements} />
      </ScrollView>
    </SafeAreaView>
  );
 }
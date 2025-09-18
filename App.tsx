import React, { useEffect, useState } from 'react';
import 'react-native-get-random-values';
import { Alert, Button, SafeAreaView, ScrollView } from 'react-native';
import MeasurementForm from './MeasurementForm';
// import GrowthChart from './GrowthChart';
import History from './History';
import { GrowthMeasurement, BabyProfile } from './types';
import { saveMeasurements, loadMeasurements } from './storage';

const baby: BabyProfile = {
  id: '1',
  name: 'Baby A',
  birthDate: '2024-01-01',
  gender: 'female',
};

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
        <Button title="Test Button" onPress={() => Alert.alert("Button works!")} />
        <MeasurementForm onSave={addMeasurement} babyBirthDate={baby.birthDate} />
        {/* <GrowthChart data={measurements} /> */}
        <History data={measurements} />
      </ScrollView>
    </SafeAreaView>
  );
}

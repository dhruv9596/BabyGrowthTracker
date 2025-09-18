import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { GrowthMeasurement } from './types';
import { calcAgeInDays } from './utils';

interface Props {
  onSave: (m: GrowthMeasurement) => void;
  babyBirthDate: string;
}

export default function MeasurementForm({ onSave, babyBirthDate }: Props) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [head, setHead] = useState('');

  const handleSave = () => {
    const measurement: GrowthMeasurement = {
      id: uuidv4(),
      date,
      ageInDays: calcAgeInDays(babyBirthDate, date),
      weightKg: parseFloat(weight),
      heightCm: parseFloat(height),
      headCm: parseFloat(head),
    };
    console.log("✅ Saving measurement:", measurement);
    onSave(measurement);

    // clear inputs
    setWeight('');
    setHeight('');
    setHead('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} />

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Head Circumference (cm)</Text>
      <TextInput
        style={styles.input}
        value={head}
        onChangeText={setHead}
        keyboardType="numeric"
      />

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  label: { marginTop: 8 },
  input: { borderWidth: 1, padding: 8, marginTop: 4, borderRadius: 4 },
});

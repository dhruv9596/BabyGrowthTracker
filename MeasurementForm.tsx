import React from 'react';
 import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
 import { useForm, Controller } from 'react-hook-form';
 import { v4 as uuidv4 } from 'uuid';
 import { GrowthMeasurement } from './types';
 import { calcAgeInDays } from './utils';
 interface Props {
  onSave: (m: GrowthMeasurement) => void;
  babyBirthDate: string;
 }
 export default function MeasurementForm({ onSave, babyBirthDate }: Props) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => {
    const today = (data.date ?? new Date().toISOString().split('T')[0]);
    const measurement: GrowthMeasurement = {
      id: uuidv4(),
      date: today,
      ageInDays: calcAgeInDays(babyBirthDate, today),
      weightKg: parseFloat(data.weight),
      heightCm: parseFloat(data.height),
      headCm: parseFloat(data.head),
    };
    onSave(measurement);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
      <Controller
        control={control}
        name="date"
        defaultValue={new Date().toISOString().split('T')[0]}
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} value={value} onChangeText={onChange} />
        )}
      />
      <Text style={styles.label}>Weight (kg)</Text>
      <Controller
        control={control}
        name="weight"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput keyboardType="numeric" style={styles.input} value={value}
 onChangeText={onChange} />
        )}
      />
      {errors.weight && <Text style={styles.error}>Weight is required</Text>}
      <Text style={styles.label}>Height (cm)</Text>
      <Controller
        control={control}
        name="height"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput keyboardType="numeric" style={styles.input} value={value}
 onChangeText={onChange} />
        )}
      />
      {errors.height && <Text style={styles.error}>Height is required</Text>}
      <Text style={styles.label}>Head Circumference (cm)</Text>
      <Controller
        control={control}
        name="head"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput keyboardType="numeric" style={styles.input} value={value}
 onChangeText={onChange} />
        )}
      />
      {errors.head && <Text style={styles.error}>Head circumference is required</Text>}
      <Button title="Save" onPress={handleSubmit(onSubmit)} />
    </View>
  );
 }
 const styles = StyleSheet.create({
  container: { padding: 12 },
  label: { marginTop: 8 },
  input: { borderWidth: 1, padding: 8, marginTop: 4, borderRadius: 4 },
  error: { color: 'red' },
 });
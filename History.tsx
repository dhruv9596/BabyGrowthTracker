 import React from 'react';
 import { View, Text, FlatList, StyleSheet } from 'react-native';
 import { GrowthMeasurement } from './types';
 interface Props {
  data: GrowthMeasurement[];
 }
 export default function History({ data }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.date}>{item.date} - {item.weightKg} kg</Text>
          <Text>Age: {item.ageInDays} days</Text>
        </View>
      )}
    />
  );
 }
 const styles = StyleSheet.create({
  row: { padding: 8, borderBottomWidth: 1 },
  date: { fontWeight: 'bold' },
 });
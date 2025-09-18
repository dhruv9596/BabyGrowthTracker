 import React from 'react';
 import { View, Dimensions } from 'react-native';
 import { LineChart } from 'react-native-chart-kit';
 import { GrowthMeasurement } from './types';
 interface Props {
  data: GrowthMeasurement[];
 }
 export default function GrowthChart({ data }: Props) {
  const labels = data.map(m => `${Math.round(m.ageInDays / 30)}m`);
  const weights = data.map(m => m.weightKg);
  return (
    <View>
      <LineChart
        data={{
          labels,
          datasets: [{ data: weights }],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        yAxisSuffix="kg"
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#f0f0f0',
          backgroundGradientTo: '#fff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
        }}
      />
    </View>
  );
 }
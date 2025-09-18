import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { GrowthMeasurement } from './types';

interface GrowthChartProps {
  data: GrowthMeasurement[];
}

const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  console.log("📊 GrowthChart data:", data);
  if (!data || data.length === 0) {
    return <Text style={{ textAlign: 'center', marginTop: 16 }}>No data for chart</Text>;
  }

  // Sort data by age for a proper line
  const sorted = [...data].sort((a, b) => a.ageInDays - b.ageInDays);
  console.log("📊 Chart labels:", sorted.map((m) => m.ageInDays.toString()));
  console.log("📊 Chart dataset:", sorted.map((m) => m.weightKg));

  const chartData = {
    labels: sorted.map((m) => m.ageInDays.toString()), // X-axis = age in days
    datasets: [
      {
        data: sorted.map((m) => m.weightKg), // Y-axis = weight
        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`, // Line color
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 8 }}>
        Weight for Age
      </Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 24} // full width with padding
        height={220}
        yAxisSuffix="kg"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          propsForDots: {
            r: '4',
            strokeWidth: '1',
            stroke: '#007bff',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 8,
        }}
      />
    </View>
  );
};

export default GrowthChart;

import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import GrowthChart from "./GrowthChart";
import { GrowthMeasurement } from "./types";
import { loadMeasurements } from "./storage";

export default function GrowthChartScreen() {
  const [measurements, setMeasurements] = useState<GrowthMeasurement[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await loadMeasurements();
      setMeasurements(stored);
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GrowthChart data={measurements} />
    </SafeAreaView>
  );
}

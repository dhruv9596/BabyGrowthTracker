/*import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import History from "./History";
import { GrowthMeasurement } from "./types";
import { loadMeasurements, saveMeasurements } from "./storage";

export default function HistoryScreen() {
  const [measurements, setMeasurements] = useState<GrowthMeasurement[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await loadMeasurements();
      setMeasurements(stored);
    })();
  }, []);

  const handleDelete = async (index: number) => {
    const updated = measurements.filter((_, i) => i !== index);
    setMeasurements(updated);
    await saveMeasurements(updated);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <History
          data={measurements}
          onEdit={() => {}} // editing stays in HomeScreen
          //onDelete={handleDelete}
        />
      </ScrollView>
    </SafeAreaView>
  );
}*/

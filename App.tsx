import React, { useEffect, useState } from "react";
import "react-native-get-random-values";
import { SafeAreaView, ScrollView } from "react-native";
import MeasurementForm from "./MeasurementForm";
import History from "./History";
import { GrowthMeasurement, BabyProfile } from "./types";
import { saveMeasurements, loadMeasurements } from "./storage";

const baby: BabyProfile = {
  id: "1",
  name: "Baby A",
  birthDate: "2024-01-01",
  gender: "female",
};

export default function App() {
  const [measurements, setMeasurements] = useState<GrowthMeasurement[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const stored = await loadMeasurements();
      setMeasurements(stored);
    })();
  }, []);

  const addOrUpdateMeasurement = async (m: GrowthMeasurement) => {
    let updated: GrowthMeasurement[];
    if (editIndex !== null) {
      updated = [...measurements];
      updated[editIndex] = m; // replace edited one
      setEditIndex(null);
    } else {
      updated = [...measurements, m];
    }
    setMeasurements(updated);
    await saveMeasurements(updated);
  };

  const handleEdit = (entry: GrowthMeasurement, index: number) => {
    setEditIndex(index);
    // pass entry down into MeasurementForm if you want to prefill fields
  };

  const handleDelete = async (index: number) => {
    const updated = measurements.filter((_, i) => i !== index);
    setMeasurements(updated);
    await saveMeasurements(updated);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <MeasurementForm
          onSave={addOrUpdateMeasurement}
          babyBirthDate={baby.birthDate}
          existing={editIndex !== null ? measurements[editIndex] : undefined}
        />
        <History data={measurements} onEdit={handleEdit} onDelete={handleDelete} />
      </ScrollView>
    </SafeAreaView>
  );
}

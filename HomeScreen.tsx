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

export default function HomeScreen() {
  const [measurements, setMeasurements] = useState<GrowthMeasurement[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Load stored measurements on mount
  useEffect(() => {
    (async () => {
      const stored = await loadMeasurements();
      setMeasurements(stored);
    })();
  }, []);

  // Add or update measurement
  const addOrUpdateMeasurement = async (m: GrowthMeasurement) => {
    let updated: GrowthMeasurement[];
    if (editIndex !== null) {
      updated = [...measurements];
      updated[editIndex] = m;
      setEditIndex(null);
    } else {
      updated = [...measurements, m];
    }
    setMeasurements(updated);
    await saveMeasurements(updated);
  };

// Delete measurement
const handleDelete = async (id: string) => {
  const updated = measurements.filter((m) => m.id !== id);
  setMeasurements(updated);
  await saveMeasurements(updated);
};

// Edit measurement
const handleEdit = (entry: GrowthMeasurement, index: number) => {
  setEditIndex(index);
};



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {/* Form Section */}
        <MeasurementForm
          onSave={addOrUpdateMeasurement}
          babyBirthDate={baby.birthDate}
          existing={editIndex !== null ? measurements[editIndex] : undefined}
        />

        {/* History Section */}
        <History
          data={measurements}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

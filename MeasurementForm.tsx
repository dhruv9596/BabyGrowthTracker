import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { GrowthMeasurement } from "./types";
import { v4 as uuidv4 } from "uuid";

interface MeasurementFormProps {
  onSave: (m: GrowthMeasurement) => void;
  babyBirthDate: string;
  existing?: GrowthMeasurement; // optional: if editing
}

export default function MeasurementForm({
  onSave,
  babyBirthDate,
  existing,
}: MeasurementFormProps) {
  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [headCm, setHeadCm] = useState("");
  const [date, setDate] = useState("");

  // Prefill form if editing
  useEffect(() => {
    if (existing) {
      setWeightKg(existing.weightKg.toString());
      setHeightCm(existing.heightCm.toString());
      setHeadCm(existing.headCm.toString());
      setDate(existing.date);
    } else {
      setWeightKg("");
      setHeightCm("");
      setHeadCm("");
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [existing]);

  const calcAgeInDays = (birthDate: string, measureDate: string) => {
    const birth = new Date(birthDate);
    const measure = new Date(measureDate);
    return Math.floor(
      (measure.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const handleSave = () => {
    if (!weightKg || !heightCm || !headCm || !date) {
      return;
    }

    const measurement: GrowthMeasurement = {
      id: existing ? existing.id : uuidv4(),
      date,
      ageInDays: calcAgeInDays(babyBirthDate, date),
      weightKg: parseFloat(weightKg),
      heightCm: parseFloat(heightCm),
      headCm: parseFloat(headCm),
    };

    onSave(measurement);

    // reset form only if adding
    if (!existing) {
      setWeightKg("");
      setHeightCm("");
      setHeadCm("");
      setDate(new Date().toISOString().split("T")[0]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {existing ? "Edit Measurement" : "Add Measurement"}
      </Text>

      <Text>Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
      />

      <Text>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        value={weightKg}
        onChangeText={setWeightKg}
        keyboardType="numeric"
      />

      <Text>Height (cm)</Text>
      <TextInput
        style={styles.input}
        value={heightCm}
        onChangeText={setHeightCm}
        keyboardType="numeric"
      />

      <Text>Head Circumference (cm)</Text>
      <TextInput
        style={styles.input}
        value={headCm}
        onChangeText={setHeadCm}
        keyboardType="numeric"
      />

      <Button title={existing ? "Update" : "Save"} onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
});

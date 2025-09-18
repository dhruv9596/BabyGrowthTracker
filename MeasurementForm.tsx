import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Switch, StyleSheet } from "react-native";
import { v4 as uuidv4 } from "uuid";
import { GrowthMeasurement } from "./types";
import { calcAgeInDays } from "./utils";

interface MeasurementFormProps {
  onSave: (m: GrowthMeasurement) => void;
  babyBirthDate: string;
  existing?: GrowthMeasurement;
}

const MeasurementForm: React.FC<MeasurementFormProps> = ({ onSave, babyBirthDate, existing }) => {
  const [unit, setUnit] = useState<"SI" | "Imperial">("SI");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [head, setHead] = useState("");
  const [date, setDate] = useState(new Date().toISOString());

  // ✅ Prefill when `existing` changes
  useEffect(() => {
    if (existing) {
      // Convert stored SI values back to display
      setWeight(existing.weightKg.toString());
      setHeight(existing.heightCm.toString());
      setHead(existing.headCm.toString());
      setDate(existing.date);
    } else {
      // Reset form for new entry
      setWeight("");
      setHeight("");
      setHead("");
      setDate(new Date().toISOString());
    }
  }, [existing]);

  const handleSave = () => {
    const ageInDays = calcAgeInDays(babyBirthDate, date);

    const weightKg = unit === "Imperial" ? parseFloat(weight) / 2.20462 : parseFloat(weight);
    const heightCm = unit === "Imperial" ? parseFloat(height) / 0.393701 : parseFloat(height);
    const headCm = unit === "Imperial" ? parseFloat(head) / 0.393701 : parseFloat(head);

    const newMeasurement: GrowthMeasurement = {
      id: existing?.id ?? uuidv4(),
      date,
      ageInDays,
      weightKg,
      heightCm,
      headCm,
    };

    onSave(newMeasurement);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{existing ? "Edit Measurement" : "Add Measurement"}</Text>

      <View style={styles.toggleRow}>
        <Text>{unit === "SI" ? "SI (kg/cm)" : "Imperial (lb/in)"}</Text>
        <Switch
          value={unit === "Imperial"}
          onValueChange={() => setUnit(unit === "SI" ? "Imperial" : "SI")}
        />
      </View>

      <TextInput
        placeholder={`Weight (${unit === "SI" ? "kg" : "lb"})`}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
      />
      <TextInput
        placeholder={`Height (${unit === "SI" ? "cm" : "in"})`}
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        style={styles.input}
      />
      <TextInput
        placeholder={`Head (${unit === "SI" ? "cm" : "in"})`}
        keyboardType="numeric"
        value={head}
        onChangeText={setHead}
        style={styles.input}
      />

      <Button title={existing ? "Update" : "Save"} onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 6,
  },
});

export default MeasurementForm;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { v4 as uuidv4 } from "uuid";
import { GrowthMeasurement } from "./types";
import { calcAgeInDays } from "./utils";

interface MeasurementFormProps {
  onSave: (m: GrowthMeasurement) => void;
  babyBirthDate: string;
  existing?: GrowthMeasurement;
}

const MeasurementForm: React.FC<MeasurementFormProps> = ({
  onSave,
  babyBirthDate,
  existing,
}) => {
  const [unit, setUnit] = useState<"SI" | "Imperial">("SI");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [head, setHead] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Prefill form if editing
  useEffect(() => {
    if (existing) {
      setWeight(existing.weightKg.toString());
      setHeight(existing.heightCm.toString());
      setHead(existing.headCm.toString());
      setDate(new Date(existing.date));
    } else {
      setWeight("");
      setHeight("");
      setHead("");
      setDate(new Date());
    }
  }, [existing]);

  const handleSave = () => {
    const ageInDays = calcAgeInDays(babyBirthDate, date.toISOString());

    const weightKg =
      unit === "Imperial" ? parseFloat(weight) / 2.20462 : parseFloat(weight);
    const heightCm =
      unit === "Imperial" ? parseFloat(height) / 0.393701 : parseFloat(height);
    const headCm =
      unit === "Imperial" ? parseFloat(head) / 0.393701 : parseFloat(head);

    const newMeasurement: GrowthMeasurement = {
      id: existing?.id ?? uuidv4(),
      date: date.toISOString(),
      ageInDays,
      weightKg,
      heightCm,
      headCm,
    };

    onSave(newMeasurement);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {existing ? "Edit Measurement" : "Add Measurement"}
      </Text>

      {/* Unit toggle */}
      <View style={styles.toggleRow}>
        <Text>{unit === "SI" ? "SI (kg/cm)" : "Imperial (lb/in)"}</Text>
        <Switch
          value={unit === "Imperial"}
          onValueChange={() =>
            setUnit(unit === "SI" ? "Imperial" : "SI")
          }
        />
      </View>

      {/* Date picker */}
      <View style={{ marginBottom: 12 }}>
        <Button
          title={`Date: ${date.toLocaleDateString()}`}
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
            maximumDate={new Date()}
          />
        )}
      </View>

      {/* Measurements */}
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
    alignItems: "center",
    marginBottom: 12,
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

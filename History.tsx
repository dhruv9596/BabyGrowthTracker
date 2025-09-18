import React, { useState } from "react";
import { View, Text, FlatList, Switch, StyleSheet } from "react-native";
import { GrowthMeasurement } from "./types";
import HistoryActions from "./HistoryActions";

interface HistoryProps {
  data: GrowthMeasurement[];
  onEdit?: (entry: GrowthMeasurement, index: number) => void;
  onDelete?: (index: number) => void;
}

const History: React.FC<HistoryProps> = ({ data, onEdit, onDelete }) => {
  const [unit, setUnit] = useState<"SI" | "Imperial">("SI");

  const convertValue = (value: number, type: "weight" | "height") => {
    if (unit === "Imperial") {
      return type === "weight"
        ? (value * 2.20462).toFixed(1) // kg → lb
        : (value * 0.393701).toFixed(1); // cm → in
    }
    return value.toFixed(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Growth History</Text>

      {/* Unit toggle */}
      <View style={styles.toggleRow}>
        <Text>Show in {unit === "SI" ? "Imperial (lb/in)" : "SI (kg/cm)"}</Text>
        <Switch
          value={unit === "Imperial"}
          onValueChange={() => setUnit(unit === "SI" ? "Imperial" : "SI")}
        />
      </View>

      {/* History list */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.noData}>No entries yet</Text>}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{new Date(item.date).toLocaleDateString()}</Text>
            <Text style={styles.cell}>{item.ageInDays}</Text>
            <Text style={styles.cell}>{convertValue(item.weightKg, "weight")}</Text>
            <Text style={styles.cell}>{convertValue(item.heightCm, "height")}</Text>
            <Text style={styles.cell}>{convertValue(item.headCm, "height")}</Text>

            {/* Actions component */}
            <HistoryActions entry={item} index={index} onEdit={onEdit} onDelete={onDelete} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  cell: { flex: 1, textAlign: "center" },
  noData: { textAlign: "center", marginTop: 16, color: "#777" },
});

export default History;

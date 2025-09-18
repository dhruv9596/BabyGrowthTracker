import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { GrowthMeasurement } from "./types";

interface HistoryProps {
  data: GrowthMeasurement[];
  onEdit?: (entry: GrowthMeasurement, index: number) => void;
  onDelete?: (id: string) => void;
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

  const confirmDelete = (id: string) => {
      Alert.alert("Delete Entry", "Are you sure you want to delete this entry?", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => onDelete?.(id) },
      ]);
    };




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Growth History</Text>

      {/* Unit toggle */}
      <View style={styles.toggleRow}>
        <Text>
          Show in {unit === "SI" ? "Imperial (lb/in)" : "SI (kg/cm)"}
        </Text>
        <Switch
          value={unit === "Imperial"}
          onValueChange={() =>
            setUnit(unit === "SI" ? "Imperial" : "SI")
          }
        />
      </View>

      {/* Table header */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.headerText]}>Date</Text>
        <Text style={[styles.cell, styles.headerText]}>Age (days)</Text>
        <Text style={[styles.cell, styles.headerText]}>Weight</Text>
        <Text style={[styles.cell, styles.headerText]}>Height</Text>
        <Text style={[styles.cell, styles.headerText]}>Head</Text>
        <Text style={[styles.actions, styles.headerText]}>Actions</Text>
      </View>

      {/* History list */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.noData}>No entries yet</Text>
        }
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
            <Text style={styles.cell}>{item.ageInDays}</Text>
            <Text style={styles.cell}>
              {convertValue(item.weightKg, "weight")}
            </Text>
            <Text style={styles.cell}>
              {convertValue(item.heightCm, "height")}
            </Text>
            <Text style={styles.cell}>
              {convertValue(item.headCm, "height")}
            </Text>

            {/* Actions */}
            <View style={styles.actions}>
              {onEdit && (
                <TouchableOpacity onPress={() => onEdit(item, index)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              )}
              {onDelete && (
                <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              )}

            </View>
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
    marginBottom: 12,
    justifyContent: "space-between",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
  },
  headerRow: {
    backgroundColor: "#f1f1f1",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },

  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
    paddingHorizontal: 2,
  },
  headerText: {
    fontWeight: "bold",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1.5, // a little wider for buttons
  },
  editText: { color: "blue", marginHorizontal: 6 },
  deleteText: { color: "red", marginHorizontal: 6 },

  noData: { textAlign: "center", marginTop: 16, color: "#777" },
});

export default History;

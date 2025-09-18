// HistoryActions.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { GrowthMeasurement } from "./types";

interface Props {
  entry: GrowthMeasurement;
  index: number;
  onEdit?: (entry: GrowthMeasurement, index: number) => void;
  onDelete?: (index: number) => void;
}

export default function HistoryActions({ entry, index, onEdit, onDelete }: Props) {
  const confirmDelete = () => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this entry?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => onDelete && onDelete(index) },
      ]
    );
  };

  return (
    <View style={styles.actions}>
      {onEdit && (
        <TouchableOpacity onPress={() => onEdit(entry, index)}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      )}
      {onDelete && (
        <TouchableOpacity onPress={confirmDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: "row", justifyContent: "space-around", flex: 1 },
  editText: { color: "blue", marginHorizontal: 8 },
  deleteText: { color: "red", marginHorizontal: 8 },
});

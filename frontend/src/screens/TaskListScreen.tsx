import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { getTasks, deleteTask } from "../services/taskService";
import { useAuth } from "../context/AuthContext";

export default function TaskListScreen({ navigation }: any) {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await getTasks(token!);
    setTasks(res);
  };

  useEffect(() => {
    loadTasks();
  }, );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={styles.task}
            onPress={() => navigation.navigate("EditTask", { task: item })}>
            <Text>{item.title}</Text>
            <TouchableOpacity onPress={() => deleteTask(token!, item.id).then(loadTasks)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate("AddTask")}>
        <Text style={{ color: "white" }}>+ Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, marginBottom: 10 },
  task: {
    backgroundColor: "#eee",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addBtn: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  delete: { color: "red" },
});

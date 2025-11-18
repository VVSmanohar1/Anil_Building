import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { createTask } from "../services/taskService";
import { useAuth } from "../context/AuthContext";

export default function AddTaskScreen({ navigation }: any) {
  const { token } = useAuth();
  const [title, setTitle] = useState("");

  const saveTask = async () => {
    await createTask(token!, { title });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Task</Text>
      <InputField placeholder="Task title" value={title} onChangeText={setTitle} />
      <CustomButton title="Save Task" onPress={saveTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold" },
});

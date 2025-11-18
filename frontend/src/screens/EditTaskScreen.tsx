import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { updateTask } from "../services/taskService";
import { useAuth } from "../context/AuthContext";

export default function EditTaskScreen({ route, navigation }: any) {
  const { token } = useAuth();
  const { task } = route.params;

  const [title, setTitle] = useState(task.title);

  const save = async () => {
    await updateTask(token!, task.id, { title });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Task</Text>
      <InputField value={title} onChangeText={setTitle} />
      <CustomButton title="Save Changes" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold" },
});

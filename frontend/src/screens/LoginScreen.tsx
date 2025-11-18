import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);
      login(res.token, res.user);
      navigation.navigate("TaskList");
    } catch (e) {
      console.log("Login Failed", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />

      <CustomButton title="Login" onPress={handleLogin} />
      <CustomButton title="Go to Signup" onPress={() => navigation.navigate("Signup")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
});

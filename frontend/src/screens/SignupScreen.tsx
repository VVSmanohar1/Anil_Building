import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { signupUser } from "../services/authService";

export default function SignupScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await signupUser(name, email, password);
      navigation.navigate("Login");
    } catch (e) {
      console.log("Signup Failed", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <InputField placeholder="Name" value={name} onChangeText={setName} />
      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />

      <CustomButton title="Signup" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
});

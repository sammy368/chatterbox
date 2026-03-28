import { supabase } from "@/lib/supabase";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);

  const handleSendOtp = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setIsOtpSent(true);
      Alert.alert("Success", "OTP sent to your email!");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP");
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) {
      Alert.alert("Verification Error", error.message);
    }
    // If successful, the auth state will change and the user will be redirected
  };

  const handleResendOtp = () => {
    setIsOtpSent(false);
    setOtp("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chatterbox</Text>
      {!isOtpSent ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Button title="Send OTP" onPress={handleSendOtp} />
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to {email}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
          />
          <Button title="Verify OTP" onPress={handleVerifyOtp} />
          <View style={styles.spacer} />
          <Button title="Resend OTP" onPress={handleResendOtp} color="gray" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  spacer: { height: 10 },
});

import { Slot, useRouter, useSegments } from "expo-router";
import React, { useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { AuthContext, AuthProvider } from "../context/AuthContext";

function RootLayout() {
  const context = useContext(AuthContext);

  if (!context) return null;

  const { session, loading } = context;
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(tabs)";

    if (session && inAuthGroup) {
      // Redirect authenticated users away from auth screens
      router.replace("/(tabs)");
    } else if (!session && !inAuthGroup) {
      // Redirect unauthenticated users to login
      router.replace("/login");
    }
  }, [session, loading, segments]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}

export default function App() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

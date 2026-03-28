import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  "https://gupycpsuoaahrjscxhxm.supabase.co";
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABSE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1cHljcHN1b2FhaHJqc2N4aHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2OTY2NDUsImV4cCI6MjA5MDI3MjY0NX0.mMv8nNoStXW7WLfGI1Q2Q3SiZ2TpQQCpYPUQcFo2tiU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

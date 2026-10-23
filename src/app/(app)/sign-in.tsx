import { useSignIn } from "@clerk/expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function SignInScreen() {
  const { signIn, errors, fetchStatus } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoading = fetchStatus === "fetching";

  const handleSignIn = async () => {
    if (!email || !password) return;

    try {
      const { error } = await signIn.password({
        identifier: email.trim(),
        password,
      });

      if (error) {
        console.log("Sign in error:", error);
        return;
      }

      if (signIn.status === "complete") {
        await signIn.finalize();
        router.replace("/(app)/(tabs)");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email address"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {errors.fields.identifier && (
        <Text style={styles.error}>
          {errors.fields.identifier.message}
        </Text>
      )}

      {errors.fields.password && (
        <Text style={styles.error}>
          {errors.fields.password.message}
        </Text>
      )}

      <Pressable
        style={styles.button}
        onPress={handleSignIn}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </Pressable>

      <Link href="/sign-up">
        Don't have an account? Sign Up
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  error: {
    color: "red",
  },
});
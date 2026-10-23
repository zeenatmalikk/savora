
import { useAuth, useUser } from '@clerk/expo';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert('Error', 'Unable to sign out. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  };

  if (!isLoaded) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isSignedIn) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.title}>You're signed out</Text>
        <Text>Please sign in to access the home page.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>YOUR ACCOUNT</Text>
        <Text style={styles.title}>Welcome home!</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>
          {user?.primaryEmailAddress?.emailAddress ?? 'No email available'}
        </Text>

        <Text style={styles.label}>User ID</Text>
        <Text style={styles.userId}>{user?.id ?? 'Loading...'}</Text>

        <Button title="Sign out" onPress={handleSignOut} />
          
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  card: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: '#fff',
    gap: 12,
    elevation: 3,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#64748b',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0f172a',
  },
  label: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#0f172a',
  },
  userId: {
    fontSize: 12,
    color: '#475569',
  },
  signOutButton: {
    backgroundColor: '#dc2626',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.6,
  },
});

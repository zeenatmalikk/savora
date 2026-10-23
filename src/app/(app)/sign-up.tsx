
import { useAuth, useSignUp } from '@clerk/expo';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { signUp} = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isLoaded = authLoaded;

  const handleSignUp = async () => {
    if (!isLoaded || isSubmitting) return;

    if (!emailAddress.trim() || !password) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const { error } = await signUp.password({
        emailAddress: emailAddress.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      console.log('Signup status:', signUp.status);
      console.log('Unverified fields:', signUp.unverifiedFields);

      if (signUp.status === 'complete') {
        const { error: finalizeError } = await signUp.finalize();

        if (finalizeError) {
          setErrorMessage(finalizeError.message);
        }

        return;
      }

      if (signUp.status === 'missing_requirements') {
        const { error: sendError } =
          await signUp.verifications.sendEmailCode();

        if (sendError) {
          setErrorMessage(sendError.message);
          return;
        }

        setIsVerifying(true);
      }
    } catch (error) {
      console.error('Signup exception:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'Signup failed.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded || isSubmitting) return;

    if (!code.trim()) {
      setErrorMessage('Please enter your verification code.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const { error } = await signUp.verifications.verifyEmailCode({
        code: code.trim(),
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (signUp.status === 'complete') {
        const { error: finalizeError } = await signUp.finalize();

        if (finalizeError) {
          setErrorMessage(finalizeError.message);
        }
      } else {
        setErrorMessage(
          'Verification succeeded, but additional signup requirements remain.',
        );
      }
    } catch (error) {
      console.error('Verification exception:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'Verification failed.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading authentication...</Text>
      </View>
    );
  }

  if (isSignedIn) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>You're signed in!</Text>
        <Text>Open the home screen to continue.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {isVerifying ? 'Verify your email' : 'Create an account'}
      </Text>

      {isVerifying ? (
        <>
          <Text style={styles.description}>
            Enter the verification code sent to {emailAddress}.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Verification code"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            autoCapitalize="none"
          />

          <Button
            title={isSubmitting ? 'Verifying...' : 'Verify email'}
            onPress={handleVerify}
            disabled={isSubmitting}
          />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            value={emailAddress}
            onChangeText={setEmailAddress}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Button
            title={isSubmitting ? 'Creating account...' : 'Sign up'}
            onPress={handleSignUp}
            disabled={isSubmitting}
          />
        </>
      )}

      {isSubmitting && <ActivityIndicator />}

      {!!errorMessage && (
        <Text style={styles.error}>{errorMessage}</Text>
      )}

      <View nativeID="clerk-captcha" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },
  error: {
    color: '#dc2626',
    fontSize: 14,
  },
});

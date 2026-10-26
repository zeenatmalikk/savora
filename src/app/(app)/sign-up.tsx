
import { useAuth, useSignUp } from '@clerk/expo';
import { Link } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { signUp } = useSignUp();

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
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="text-[#3F2E24] text-lg font-inter">
          Loading authentication...
        </Text>
      </View>
    );
  }

  if (isSignedIn) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-[24px] font-display mb-2 text-[#3F2E24]">
          You're signed in!
        </Text>
        <Text>Open the home screen to continue.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 justify-center px-6">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',

        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full flex-row items-center justify-between">
          {/* Text section */}
          <View className="w-3/5 ">
            <Text className="text-[42px] font-display mb-2 text-[#3F2E24]">
              A seat at your table.
            </Text>

          </View>

          {/* Image on peach plate */}
          <View className="w-2/5 items-center justify-center p-2">
            {/* Plate */}
            <View
              className="w-full aspect-square rounded-full items-center justify-center"
              style={{
                backgroundColor: '#E3CFA6',
              }}
            >
              <Image
                source={require('../../../assets/images/sign-up-food.png')}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
          </View>

        </View>
        <View className='w-4/5 mb-10'>
          <Text className="text-lg font-inter text-[#796451]">
            Create an account. Your next favorite
            meal is waiting.
          </Text>
        </View>
        {isVerifying ? (
          <>
            <Text className='text-[#3F2E24] text-lg font-inter-bold pb-2'>
              Enter the verification code sent to {emailAddress}.
            </Text>

            <TextInput
              className='border border-[#D7C5A9] bg-[#F3E8D5] rounded-3xl h-[56px] w-full px-4 text-[#796451] font-inter'
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
            <View className='mb-4'>
              <Text className='text-[#3F2E24] text-lg font-inter-bold pb-2'>
                Email
              </Text>
              <TextInput
                className='border border-[#D7C5A9] bg-[#F3E8D5] rounded-3xl h-[56px] w-full px-4 text-[#796451] font-inter'
                placeholder="Email address"
                value={emailAddress}
                onChangeText={setEmailAddress}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}

              />
            </View>
            <View>
              <Text className='text-[#3F2E24] text-lg font-inter-bold pb-2'>
                Password
              </Text>
              <TextInput
                className='border border-[#D7C5A9] bg-[#F3E8D5] rounded-3xl h-[56px] w-full px-4 text-[#796451] font-inter'
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <Text className='text-[#796451] text-md font-inter pt-2'>
              Make it yours with at least 8 characters.
            </Text>

            <Pressable
              onPress={handleSignUp}
              disabled={isSubmitting}
              className={`w-full h-[56px] items-center justify-center rounded-full bg-[#864332] mt-10 py-4 ${isSubmitting ? 'opacity-60' : 'active:opacity-80'
                }`}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <View className="flex-row items-center justify-between w-full px-6 ">
                  <Text className="font-inter-bold text-base text-white">
                    Create account
                  </Text>
                  <ArrowRight color="#FFFFFF" />
                </View>
              )}
            </Pressable>
            <Text className='text-center mt-5 font-inter'>Already have an account? <Link href="/sign-in"><Text className='text-[#864332] font-inter-bold'>Sign in</Text></Link></Text>
          </>
        )}

        {isSubmitting && <ActivityIndicator />}

        {!!errorMessage && (
          <Text className="text-[#dc2626] text-sm">{errorMessage}</Text>
        )}

        <View nativeID="clerk-captcha" />
      </ScrollView>
    </SafeAreaView>
  );
}



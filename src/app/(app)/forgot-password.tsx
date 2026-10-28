
import { useSignIn } from '@clerk/expo'
import { type Href, Link, useRouter } from 'expo-router'
import { ArrowRight } from 'lucide-react-native'
import React, { useRef } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function ForgotPassword() {
  const { signIn, errors, fetchStatus } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [code, setCode] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [codeSent, setCodeSent] = React.useState(false)
  const inputRefs = useRef<Array<TextInput | null>>([]);
  // Step 1: Send the password reset code to the user's email
  async function sendCode() {
    const { error: createError } = await signIn.create({
      identifier: emailAddress,
    })
    if (createError) {
      console.error(JSON.stringify(createError, null, 2))
      return
    }

    const { error: sendCodeError } = await signIn.resetPasswordEmailCode.sendCode()
    if (sendCodeError) {
      console.error(JSON.stringify(sendCodeError, null, 2))
      return
    }

    setCodeSent(true)
  }

  // Step 2: Verify the code provided by the user
  async function verifyCode() {
    const { error } = await signIn.resetPasswordEmailCode.verifyCode({
      code,
    })
    if (error) {
      console.error(JSON.stringify(error, null, 2))
      return
    }
  }

  // Step 3: Submit the new password
  async function submitNewPassword() {
    const { error } = await signIn.resetPasswordEmailCode.submitPassword({
      password,
      // Optional: sign the user out of all other authenticated sessions
      signOutOfOtherSessions: true,
    })
    if (error) {
      console.error(JSON.stringify(error, null, 2))
      return
    }

    if (signIn.status === 'complete') {
      const { error } = await signIn.finalize({
        navigate: async ({ session, decorateUrl }) => {
          // Handle session tasks
          // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
          if (session?.currentTask) {
            console.log(session.currentTask)
            return
          }

          // If no session tasks, navigate the signed-in user to the home page
          const url = decorateUrl('/')
          if (url.startsWith('http')) {
            window.location.href = url
          } else {
            router.push(url as Href)
          }
        },
      })

      if (error) {
        console.error(JSON.stringify(error, null, 2))
        return
      }
    } else if (signIn.status === 'needs_second_factor') {
      // See https://clerk.com/docs/guides/development/custom-flows/authentication/multi-factor-authentication
    } else {
      // Check why the sign-in is not complete
      console.error('Sign-in attempt not complete:', signIn)
    }
  }

  // Step 4 UI: Handle 2FA, or other authentication requirements


  if (signIn.status === 'needs_second_factor') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Two-Factor Authentication Required
        </Text>
        <Text style={styles.message}>
          2FA is required, but this UI does not handle that yet.
        </Text>
      </View>
    )
  }

  // Step 3 UI: Collect the new password from the user
  if (signIn.status === 'needs_new_password') {
    return (
      <SafeAreaView className="flex-1 justify-center px-6">
        <Text className='title'>
          Set New Password
        </Text>
        <View className='flex gap-2 mt-8'>
          <Text className='label'>New password</Text>
        <TextInput
          className="text-field"
          value={password}
          placeholder="Enter new password"
          placeholderTextColor="#666666"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        </View>
        {errors.fields.password && (
          <Text className='mt-3 text-[#d32f2f] text-center'>{errors.fields.password.message}</Text>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            fetchStatus === 'fetching' && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          className='cta-btn' onPress={submitNewPassword}
          disabled={fetchStatus === 'fetching'}
        >
          <Text style={styles.buttonText}>Set new password</Text>
        </Pressable>
      </SafeAreaView>
    )
  }

  // Step 2 UI: Collect the code provided by the user
  if (codeSent) {
    return (
      <SafeAreaView className="flex-1 justify-center px-6">
        <Text className='title'>
          Verify Code
        </Text>
       <View className='flex gap-2 mt-8'>
         <Text className='label'>
          Code
        </Text>
        <View className="flex-row justify-between">
          {Array.from({ length: 6 }, (_, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              className="code-box"
              value={code[index] ?? ''}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(value) => {
                const digit = value.replace(/\D/g, '').slice(-1);
                const digits = code.split('');

                digits[index] = digit;
                const updatedCode = digits.join('').slice(0, 6);

                setCode(updatedCode);

                if (digit && index < 5) {
                  inputRefs.current[index + 1]?.focus();
                }
              }}
              onKeyPress={({ nativeEvent }) => {
                if (
                  nativeEvent.key === 'Backspace' &&
                  !code[index] &&
                  index > 0
                ) {
                  inputRefs.current[index - 1]?.focus();
                }
              }}
              selectTextOnFocus
            />
          ))}
        </View>
       </View>
        {errors.fields.code && (
          <Text className='mt-3 text-[#d32f2f]'>{errors.fields.code.message}</Text>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            fetchStatus === 'fetching' && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          className='cta-btn'
          onPress={verifyCode}
          disabled={fetchStatus === 'fetching'}
        >
          <View className="flex-row items-center justify-between w-full px-6 ">
            <Text className="font-inter-bold text-base text-white">
              Verify Code
            </Text>
            <ArrowRight color="#FFFFFF" />
          </View>
        </Pressable>
      </SafeAreaView>
    )
  }

  // Step 1 UI: Collect the user's email so you can send them a password reset code
  return (
    <SafeAreaView className="flex-1 justify-center px-6">
      <Text className='title'>
        Forgot Password?
      </Text>
      <View className='flex gap-2 mt-8'>
        <Text className='label'>Email address</Text>
        <TextInput
          className="text-field"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#666666"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          keyboardType="email-address"
        />
      </View>
      {errors.fields.identifier && (
        <Text className='mt-3 text-[#d32f2f]'>{errors.fields.identifier.message}</Text>
      )}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          (!emailAddress || fetchStatus === 'fetching') && styles.buttonDisabled,
          pressed && styles.buttonPressed,
        ]}
        className='cta-btn'
        onPress={sendCode}
        disabled={!emailAddress || fetchStatus === 'fetching'}
      >
        <View className="flex-row items-center justify-between w-full px-6 ">

          <Text className="font-inter-bold text-white">Send Code</Text>
          <ArrowRight color="#FFFFFF" />
        </View>
      </Pressable>
      {/* For your debugging purposes. You can just console.log errors,
      but we put them in the UI for convenience */}
      {/* {errors.fields.code && <Text style={styles.debug}>{JSON.stringify(errors, null, 2)}</Text>} */}

      <Text className='text-center mt-7 font-inter'>Remember your password? <Link href="/sign-in"><Text className='text-[#864332] font-inter-bold'>Sign in</Text></Link></Text>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
  },
  message: {
    fontSize: 14,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 12,
    alignItems: 'center',
  },
  error: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: -8,
  },
  debug: {
    fontSize: 10,
    opacity: 0.5,
    marginTop: 8,
  },
})
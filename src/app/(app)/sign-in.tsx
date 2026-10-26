import { useSignIn } from "@clerk/expo";
import { Link, router } from "expo-router";
import { ArrowRight, Heart } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <SafeAreaView className="flex-1 justify-center px-6">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',

        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full flex-row items-center justify-between">
          <View className="w-3/5 ">
            <Text className="title">Back for
              seconds?</Text>
          </View>

          {/* Image on peach plate */}
          <View className="w-2/5 items-center justify-center p-2">
            {/* Plate */}
            <View
              className="w-full aspect-square rounded-full items-center justify-center"
              style={{
                backgroundColor: '#EBC3AD',
              }}
            >
              <Image
                source={require('../../../assets/images/sign-in-food.png')}
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
            Welcome back. Let’s pick up
            something delicious.
          </Text>
        </View>
        <View className='mb-4'>
          <Text className='label'>
            Email
          </Text>
          <TextInput
            className='text-field'
            placeholder="Email address"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className='w-full '>
          
          <Text className='label'>
            Password
          </Text>
        

          <TextInput
            className='text-field'

            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
           {errors.fields.identifier && (
          <Text className='text-red-500 text-sm mt-1 text-center'>
            {errors.fields.identifier.message}
          </Text>
        )}

        {errors.fields.password && (
          <Text className='text-red-500 text-sm mt-1 text-center'>
            {errors.fields.password.message}
          </Text>
        )}
        <Link href="/forgot-password">
          <Text className='text-right text-[#864332] text-lg font-inter-bold w-full mt-2'>Forgot password?</Text>
        </Link>
        </View>
       

        <Pressable
          onPress={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Pressable
              onPress={handleSignIn}
              // disabled={isSubmitting}
              className={'cta-btn'}
            >

              <View className="flex-row items-center justify-between w-full px-6 ">
                <Text className="font-inter-bold text-base text-white">
                  Sign in
                </Text>
                <ArrowRight color="#FFFFFF" />
              </View>

            </Pressable>
          )}
        </Pressable>
        <Text className='text-center mt-5 font-inter'>New to savora? <Link href="/sign-up"><Text className='text-[#864332] font-inter-bold'>Sign up</Text></Link></Text>
        <View className='bg-[#F3E8D5] rounded-2xl p-4 mt-6 flex-row items-center justify-center gap-4'>
          <Heart color="#864332" size={20} />
         <View className='flex-col items-start justify-center gap-1'>
           <Text className='text-[#3F2E24] text-xl font-display'>
            Your good taste, remembered.
          </Text>
          <Text className='text-[#3F2E24] text-md font-inter'>
            Your saved recipes are right where you left them.
          </Text>
         </View>

        </View>
      </ScrollView>
    </SafeAreaView>
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
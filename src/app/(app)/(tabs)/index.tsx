
import Carousel from '@/components/carousel';
import FeatureRecipe from '@/components/feature-recipe';
import MealType from '@/components/meal-type';
import { useAuth, useUser } from '@clerk/expo';
import { Stack } from 'expo-router';
import { ArrowUpRight } from 'lucide-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
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
      <View >
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isSignedIn) {
    return (
      <SafeAreaView >
        <Text >You're signed out</Text>
        <Text>Please sign in to access the home page.</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View
              style={{
                flex: 1,
                minWidth: 0,
                paddingBottom: 2,
              }}
              className="flex-row items-center"
            >
              <View style={{ paddingRight: 8 }}>
                {user?.imageUrl ? (
                  <Image
                    source={{ uri: user.imageUrl }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                    }}
                  />
                ) : (
                  <View className="h-10 w-10 rounded-full bg-[#F8DCC8] items-center justify-center">
                    <Text className="font-inter-bold text-[#864332]">
                      {user?.firstName?.charAt(0).toUpperCase() ?? 'U'}
                    </Text>
                  </View>
                )}
              </View>

              <View>
                <Text className="font-inter text-xs text-[#796451]">
                  Welcome back,
                </Text>
                <Text
                  className="font-inter text-base text-[#3F2E24]"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {user?.emailAddresses[0]?.emailAddress ?? 'Welcome'}
                </Text>
              </View>
            </View>
          ),

          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#FFF8F0',
          },
          headerShadowVisible: false,

        }}
      />

      <ScrollView
        className="flex-1 bg-[#FFF8F0]"
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="section-title">What's Cooking?</Text>

        <Carousel />

        <MealType />
        <View className="flex-row items-baseline justify-between">
          <Text className="section-title mt-7">Grab a drink?</Text>
          <View className="flex-row items-center justify-start">
            <Text className="">Explore</Text>

            <ArrowUpRight size={16} color="#864332" />
          </View>
        </View>
        <FeatureRecipe />
      </ScrollView>
    </>
  );
}


import { useAuth } from '@clerk/expo';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const Layout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  const [fontsLoaded, fontError] = useFonts({
    DMSerifDisplay: require('../../../assets/fonts/DM_Serif_Display/DMSerifDisplay-Regular.ttf'),
    DMSerifDisplayItalic: require('../../../assets/fonts/DM_Serif_Display/DMSerifDisplay-Italic.ttf'),
    Inter: require('../../../assets/fonts/Inter/static/Inter_24pt-Regular.ttf'),
    InterBold: require('../../../assets/fonts/Inter/static/Inter_24pt-Bold.ttf'),
  });

  useEffect(() => {
    console.log('Clerk loaded:', isLoaded);
    console.log('Fonts loaded:', fontsLoaded);
    console.log('Font error:', fontError);
  }, [isLoaded, fontsLoaded, fontError]);

  // Don't let font loading block authentication screens.
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading authentication...</Text>
      </View>
    );
  }

  if (fontError) {
    console.error('Font loading failed:', fontError);
  }

  return (
    <Stack screenOptions={{ headerShown: false,  contentStyle: {
          backgroundColor: '#FFF8F0',
        }, }}>
      <Stack.Protected guard={!!isSignedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default Layout;
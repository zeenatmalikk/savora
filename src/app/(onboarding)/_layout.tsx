import { Stack } from 'expo-router'
const Layout = () => {
  return (
     <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="preferences" />
    </Stack>
  )
}

export default Layout
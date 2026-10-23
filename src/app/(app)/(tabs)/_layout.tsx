import { Tabs } from 'expo-router'
import { Home, User } from 'lucide-react-native'
const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
         headerShown:false,
          tabBarIcon: ({ color, size }) => (
           <Home/>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <User/>
          ),
        }}
      />
    </Tabs>
  )
}

export default Layout
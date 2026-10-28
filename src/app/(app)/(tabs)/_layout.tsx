
import { Tabs } from 'expo-router';
import { Compass, Heart, Home, UserRound } from 'lucide-react-native';
import { View } from "react-native";
const COLORS = {
  background: '#FAF5EC',
  active: '#864332',
  inactive: '#806A55',
  activeBackground: '#F3E8D5',
  border: '#DCCBB2',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.background,
          
        },
        headerShadowVisible: false,
        headerTintColor: '#3F2E24',
        headerTitleStyle: {
          color: '#3F2E24',
        },
        sceneStyle: {
          backgroundColor: '#FAF5EC',
        },

        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarShowLabel: true,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          fontFamily: 'Inter-Bold',
          fontSize: 12,
          marginTop: 5,
        },
        tabBarItemStyle: {
          paddingTop: 8,
          paddingBottom: 4,
        },
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 100,
          paddingTop: 8,
          paddingBottom: 24,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitleStyle: {
            fontSize: 20,
          },
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon focused={focused}>
              <Home color={color} size={size} strokeWidth={2} />
            </TabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          headerShown: false,
          title: 'Explore',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon focused={focused}>
              <Compass color={color} size={size} strokeWidth={2} />
            </TabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="liked"
        options={{
          title: 'Liked',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon focused={focused}>
              <Heart color={color} size={size} strokeWidth={2} />
            </TabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'My kitchen',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon focused={focused}>
              <UserRound color={color} size={size} strokeWidth={2} />
            </TabIcon>
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({
  focused,
  children,
}: {
  focused: boolean;
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        width: 62,
        height: 36,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: focused ? COLORS.activeBackground : 'transparent',
      }}
    >
      {children}
    </View>
  );
}

import { Redirect, Tabs } from 'expo-router';
import { Home, CirclePlus, Settings } from 'lucide-react-native';
import { useState } from 'react';
export default function TabLayout() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <Redirect href="/(auth)/login" />
    )
    }
    
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarShowLabel: false, 
      tabBarStyle: {
        height: 80, 
        paddingBottom: 10,
        paddingTop: 10,
      },
      tabBarActiveTintColor:'#52B788'
    }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Home
              size={35}
              color={color}
              strokeWidth={2}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="createEvent"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <CirclePlus
              size={35}
              color={color}
              strokeWidth={2}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Settings
              size={35}
              color={color}
              strokeWidth={2}
            />
          ),
        }}
      />
    </Tabs>
  );
}
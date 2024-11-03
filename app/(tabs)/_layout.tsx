import { Redirect, router, Tabs } from 'expo-router';
import { Home, CirclePlus, Settings } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator } from 'react-native';
import { AuthService } from '@/services/auth/api';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/authSlice';

export default function TabLayout() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      AuthService.getUser().then((res) => {
        setLoading(false)
        dispatch(login(res.data.user))
        
      }).catch(() => {
        router.replace('/(auth)/login');
      })
    }, [])
  );

  if (loading) {
    return (
      <ActivityIndicator />
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
      <Tabs.Screen
      name="details/[id]"
      options={{
        href:null
      }}
      />

    </Tabs>
  );
}
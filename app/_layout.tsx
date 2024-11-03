import { Stack } from "expo-router";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { store } from "@/redux/store";
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#52B788" />
      </View>
    );
  }
  return (
    <GestureHandlerRootView >


    <Provider store={store}>
      <Toast />
      <Stack>
        <Stack.Screen  name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen  name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
    </GestureHandlerRootView>

  
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
 
});
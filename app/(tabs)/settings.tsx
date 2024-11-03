import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import * as SecureStore from 'expo-secure-store';

export default function settings() {

  const router = useRouter();
  const dispatch = useDispatch();

  const Logout = () => {
    SecureStore.deleteItemAsync('accessToken');
    SecureStore.deleteItemAsync('refreshToken');
    router.replace('/(auth)/login');
    dispatch(logout());
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
       <TouchableOpacity style={{ 
       borderWidth: 1,
    borderColor: '#FC2F2F',
    padding: 16,
    borderRadius: 8,
marginHorizontal: 16,
    alignItems: 'center',}} onPress={Logout}>
    <Text style={{
      color: '#FC2F2F',
      fontFamily: 'Inter_700Bold',
      fontSize: 16,
      width: '100%',
      textAlign: 'center',
    }}>Logout</Text>
  </TouchableOpacity>
      
    </View>
  );
}

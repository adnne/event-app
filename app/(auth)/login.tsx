import React from 'react'
import { View, Text,  TextInput, StyleSheet ,TouchableOpacity} from 'react-native';
import { Link } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import Logo from '@/assets/logos/Logo.svg'
import baseStyle from '@/constants/baseStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller,FieldValues } from 'react-hook-form';
import { AuthService } from '@/services/auth/api';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/authSlice';
import { useRouter } from 'expo-router';

const LoginPage = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });
  const router = useRouter();

  const dispatch = useDispatch();

  const onSubmit = (data:API.LoginForm) => {
    AuthService.login(data).then((res) => {
      dispatch(login(res.data.user));
      SecureStore.setItem('accessToken', res.data.access);
      SecureStore.setItem('refreshToken', res.data.refresh);
      router.replace('/(tabs)/');
    }).catch((err) => {
      console.log(err)
    })
  };
  return (
   
<SafeAreaView style={baseStyle.baseContainer}>
  <View style={styles.header}>
    <Logo width={280} height={75}  />
  </View>
<View style={styles.content}>
  <Text style={styles.headerTitle} >Login</Text>

  <Controller
    control={control}
    rules={{
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    }}
    render={({ field: { onChange, onBlur, value } }) => (
      <View style={baseStyle.baseInput}>
        <TextInput
          style={{width:'100%'}}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder="Email"
          keyboardType="email-address"
        />
      </View>
    )}
    name="email"
  />
  {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

  <Controller
    control={control}
    rules={{
      required: 'Password is required',
    }}
    render={({ field: { onChange, onBlur, value } }) => (
      <View style={baseStyle.baseInput}>
        <TextInput
          style={{width:'100%'}}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder="Password"
          secureTextEntry
        />
      </View>
    )}
    name="password"
  /> 
  {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

  <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
    <Text style={styles.buttonText}>Login</Text>
  </TouchableOpacity>

  <Link href='/(auth)/register'  >
    <Text style={styles.linkText}>Don't have an account? 
      <Text style={{color: '#52B788'}} >
      {' '}Register
      </Text>
       
       </Text>
  </Link>
</View>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 16,
    justifyContent: 'center',
    gap: 16,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 80,
  },
  headerTitle: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily:'Inter_700Bold',
    marginBottom: 35,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },

  errorText: {
    color: 'red',
  },
  button: {
    backgroundColor: '#52B788',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    fontFamily:'Inter_500Medium',
  },
});

export default LoginPage
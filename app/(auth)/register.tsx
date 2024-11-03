import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Logo from '@/assets/logos/Logo.svg';
import baseStyle from '@/constants/baseStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { Link, router } from 'expo-router';
import { AuthService } from '@/services/auth/api';
import Toast from 'react-native-toast-message';

const RegisterPage = () => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      email: '',
      password1: '',
      password2: '',
    }
  });

  const onSubmit = (data:API.RegisterForm) => {

    AuthService.register(data).then((res) => {
      router.replace('/(auth)/login');
      Toast.show({
        type: 'success',
        text1: 'Account created succesfully '
      });
  
    }).catch(() => {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
  
    })
    
  };

  const password1 = watch('password1');

  return (
    <SafeAreaView style={baseStyle.baseContainer}>
      <View style={styles.header}>
        <Logo width={280} height={75} />
      </View>
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Register</Text>

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
          rules={{ required: 'Password1 is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={baseStyle.baseInput}>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Password1"
                secureTextEntry
              />
            </View>
          )}
          name="password1"
        />
        {errors.password1 && <Text style={styles.errorText}>{errors.password1.message}</Text>}

        <Controller
          control={control}
          rules={{
            required: 'Confirm password1 is required',
            validate: value => value === password1 || 'Password1s do not match',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={baseStyle.baseInput}>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Confirm Password1"
                secureTextEntry
              />
            </View>
          )}
          name="password2"
        />
        {errors.password2 && <Text style={styles.errorText}>{errors.password2.message}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Link href={'/(auth)/login'}>
          <Text style={styles.linkText}>
            Already have an account? <Text style={{ color: '#52B788' }}>Login</Text>
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

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
    fontFamily: 'Inter_700Bold',
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
    fontFamily: 'Inter_500Medium',
  },
});

export default RegisterPage;

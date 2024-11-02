import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Logo from '@/assets/logos/Logo.svg';
import baseStyle from '@/constants/baseStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { Link } from 'expo-router';

const RegisterPage = () => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically send the data to your API for registration
  };

  const password = watch('password');

  return (
    <SafeAreaView style={baseStyle.baseContainer}>
      <View style={styles.header}>
        <Logo width={280} height={75} />
      </View>
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Register</Text>

        {/* Username Field */}
        <Controller
          control={control}
          rules={{ required: 'Username is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={baseStyle.baseInput}>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Username"
              />
            </View>
          )}
          name="username"
        />
        {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}

        {/* Email Field */}
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

        {/* Password Field */}
        <Controller
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={baseStyle.baseInput}>
              <TextInput
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

        {/* Confirm Password Field */}
        <Controller
          control={control}
          rules={{
            required: 'Confirm password is required',
            validate: value => value === password || 'Passwords do not match',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={baseStyle.baseInput}>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Confirm Password"
                secureTextEntry
              />
            </View>
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

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

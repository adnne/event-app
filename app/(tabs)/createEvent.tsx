import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { EventService } from '@/services/event/api';

export default function CreateEventScreen() {
  const [image, setImage] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

const defaaultValue =  {
  eventName: '',
  location: '',
  date: new Date(),
  time: new Date(),
  description: '',
  seetsNumber: 0,
};
  const { control, handleSubmit, formState: { errors }, setValue,reset } = useForm({
    defaultValues: defaaultValue
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = (data) => {
    const formattedData = new FormData();

    if (image) {
      formattedData.append("image", {
        uri: image,
        type: "image/jpeg", 
        name: "event_image.jpg",
      });
    }
  
    formattedData.append("title", data.eventName);
    formattedData.append("description", data.description);
    formattedData.append(
      "date_time",
      new Date(
        data.date.getFullYear(),
        data.date.getMonth(),
        data.date.getDate(),
        data.time.getHours(),
        data.time.getMinutes()
      ).toISOString()
    );
    formattedData.append("location", data.location);
    formattedData.append("guest_limit", data.seetsNumber || null)
  
    EventService.create(formattedData).then(() => {
      router.push('/(tabs)');
    }).catch((err) => {
      console.log(err);
    })
  };
  useFocusEffect(
    React.useCallback(() => {
      setImage(null);
      reset(defaaultValue);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Create New Event</Text>

        <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.uploadedImage} />
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Ionicons name="camera-outline" size={40} color="#52B788" />
              <Text style={styles.uploadText}>Upload Event Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <Controller
          control={control}
          rules={{ required: 'Event name is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              value={value}
              placeholder="Event name"
              placeholderTextColor="#666"
            />
          )}
          name="eventName"
        />
        {errors.eventName && (
          <Text style={styles.errorText}>{errors.eventName.message}</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              value={value}
              keyboardType='numeric'

              placeholder="Seets number"
              placeholderTextColor="#666"
            />
          )}
          name="seetsNumber"
        />
        {errors.eventName && (
          <Text style={styles.errorText}>{errors.eventName.message}</Text>
        )}


        <Controller
          control={control}
          rules={{ required: 'Location is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              value={value}
              placeholder="Location"
              placeholderTextColor="#666"
            />
          )}
          name="location"
        />
        {errors.location && (
          <Text style={styles.errorText}>{errors.location.message}</Text>
        )}

        <Controller
          control={control}
          rules={{ required: 'Date is required' }}
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={value ? styles.inputText : styles.placeholderText}>
                {value ? value.toLocaleDateString() : 'Date'}
              </Text>
              {showDatePicker && (
                <DateTimePicker
                  value={value}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      onChange(selectedDate);
                    }
                  }}
                />
              )}
            </TouchableOpacity>
          )}
          name="date"
        />
        {errors.date && (
          <Text style={styles.errorText}>{errors.date.message}</Text>
        )}

        <Controller
          control={control}
          rules={{ required: 'Time is required' }}
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={value ? styles.inputText : styles.placeholderText}>
                {value ? value.toLocaleTimeString() : 'Time'}
              </Text>
              {showTimePicker && (
                <DateTimePicker
                  value={value}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime) {
                      onChange(selectedTime);
                    }
                  }}
                />
              )}
            </TouchableOpacity>
          )}
          name="time"
        />
        {errors.time && (
          <Text style={styles.errorText}>{errors.time.message}</Text>
        )}

        <Controller
          control={control}
          rules={{ required: 'Description is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, styles.textArea]}
              onChangeText={onChange}
              value={value}
              placeholder="Description"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
            />
          )}
          name="description"
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description.message}</Text>
        )}

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.createButtonText}>Create event</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageUpload: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  uploadPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    marginTop: 8,
    color: '#666',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputText: {
    color: '#000',
    fontSize: 16,
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 12,
    marginLeft: 4,
  },
  createButton: {
    backgroundColor: '#52B788',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: 'center',
    padding: 10,
  },
});
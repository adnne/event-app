import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Share,
  ActivityIndicator
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { EventService } from '@/services/event/api';
import { router } from 'expo-router';
import noImage from "@/assets/images/events/noImage.png"

export default function EventDetailsScreen() {
    const { id } = useLocalSearchParams();

    const [event, setEvent] = React.useState<API.Event | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [dateObj, setDateObj] = React.useState<Date>(new Date());
    
    const date = dateObj.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }); 
    const time = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }); 
    
    const handleShare = async () => {
      try {
        await Share.share({
          message: `Join us at ${event?.title}! ${date} at ${time} in ${event?.location}.`,
          title: event?.title,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    
    useFocusEffect(
      React.useCallback(() => {
        setLoading(true);
        const fetchEvent = async () => {
          try {
            const res = await EventService.get(id as string);
            console.log(res.data);
            setEvent(res.data);
            setDateObj(new Date(res.data.date_time)); 
          } catch (err) {
            console.log(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchEvent();
      }, [id]) 
    );
    

  if (loading) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
            <ActivityIndicator size="large" />
        </View>
    ) 
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <Image
            source={event?.image?{uri:event?.image}:noImage}
            style={styles.image}
          />
          <LinearGradient
            colors={['transparent', '#52B788']}
            style={styles.gradient}
          >
            <Text style={styles.title}>{event?.title}</Text>
          </LinearGradient>
        </View>

        {/* Event details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={20} color="#52B788" />
            <Text style={styles.detailText}>{date}</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={20} color="#52B788" />
            <Text style={styles.detailText}>{time}</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={20} color="#52B788" />
            <Text style={styles.detailText}>{event?.location}</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="people-outline" size={20} color="#52B788" />
            <Text style={styles.detailText}>{event?.guest_limit?event?.guest_limit:"Unlimited"} attendees</Text>
          </View>

          <Text style={styles.description}>
            {event?.description}
          </Text>

          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register Now</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Text style={styles.shareButtonText}>Share event</Text>
            <Ionicons name="share-outline" size={20} color="#52B788" />
          </TouchableOpacity>
        </View>
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
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailsContainer: {
    padding: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginTop: 20,
    marginBottom: 30,
  },
  registerButton: {
    backgroundColor: '#52B788',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#52B788',
    borderRadius: 8,
    padding: 16,
  },
  shareButtonText: {
    color: '#52B788',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
});
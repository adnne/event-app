import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {MapPin,Clock4,Calendar,User} from 'lucide-react-native'
import noImage from "@/assets/images/events/noImage.png"


const EventCard = (props: {event:API.Event}) => {
    const {  title, date_time, location,guest_limit, image} = props.event
    const dateObj = new Date(date_time)

    const date = dateObj.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }); 
    const time = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }); 

    
    return (
        <TouchableOpacity style={styles.eventCard}>
        <Image
          source={image?{uri:image}:noImage}
          style={styles.eventImage}
        />
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{title}</Text>
          <View style={styles.eventInfo}>
          <Calendar size={16} color="#52B788" />
            <Text style={styles.eventInfoText}>{date}</Text>
          </View>
          <View style={styles.eventInfo}>
          <Clock4 size={16} color="#52B788" />
            <Text style={styles.eventInfoText}>{time}</Text>
          </View>
          <View style={styles.eventInfo}>
          <MapPin size={16} color="#52B788" />
            <Text style={styles.eventInfoText}>{location}</Text>
          </View>
          <View style={styles.eventInfo}>
            <User size={16} color="#52B788" />
            <Text style={styles.eventInfoText}>{guest_limit?guest_limit:"Unlimited"} Seets</Text>
          </View>
        </View>
      
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginHorizontal: 16,
      marginBottom: 12,
    },
    eventCard: {
      backgroundColor: 'white',
      borderRadius: 12,
      marginHorizontal: 16,
      marginBottom: 16,
      overflow: 'hidden',
      flexDirection: 'row',
      borderColor: '#52B788',
      borderWidth: 1,
    },
    eventImage: {
      width: '40%',
      height: '100%',
      
    },
    eventDetails: {
      paddingVertical: 12,
      paddingHorizontal: 20,
    },
    eventTitle: {
      fontSize: 18,
      fontFamily:'Inter_700Bold',
      marginBottom: 10,
      color: '#4B5563',
    },
    eventInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    eventInfoText: {
      marginLeft: 6,
      color: '#4B5563',
      fontFamily:'Inter_500Medium',
    },
   
  });

export default EventCard
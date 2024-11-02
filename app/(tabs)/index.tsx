import React, { useState } from 'react';
import { View, Text,  TextInput, StyleSheet } from 'react-native';

import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from '@react-navigation/native';
import {Search} from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { debounce } from 'lodash';

import EventCard from '@/components/EventCard';
import baseStyle from '@/constants/baseStyle';

import { EventService } from '@/services/event/api';


export default function AppMainScreen() {
  const [events, setEvents] = useState<API.Pagination<API.Event>>();
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getEvents()
    }, [])
  );

  const getEvents = (params = {}) => {
    setIsLoading(true)
      EventService.list(params).then((res) => {
        setEvents(res.data)
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setIsLoading(false)
      })}

  const loadMore = () => {
    if (events?.next) {
      setIsLoading(true)
      EventService.list({page: events.next}).then((res) => {
        setEvents(prevData => {
          return {
            ...res.data,
            results: [...(prevData?.results || []), ...res.data.results]
          }
        })
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }



  const onSearch = (text = '') => {
    const task = debounce(() => {
      getEvents({search: text})
    }, 500);
    task();
  };

  return (
    <SafeAreaView style={baseStyle.baseContainer}>
      <View style={baseStyle.baseInput}>
        <Search color={'#4B5563'} height={20} width={20} style={{
          marginRight: 8
        }} />
        <TextInput
          placeholder="Search events..."
          onChangeText={onSearch}
        />
      </View>
      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      <FlashList
        data={events?.results}
        refreshing={isLoading}
        renderItem={({ item }) => <EventCard event={item} />}
        estimatedItemSize={120}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={getEvents}
        onEndReached={loadMore}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#52B788',
    
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },

  eventList: {
    flex: 1,
    backgroundColor:'white'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
 
 
});
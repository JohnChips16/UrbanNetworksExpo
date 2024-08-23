import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, TextInput , KeyboardAvoidingView, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import SwipeableViews from 'react-native-swipeable-view';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
const GetFollowers = ({ parentId, modalVisible, setModalVisible }) => {
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
const navigation = useNavigation();

  const renderRelativeDate = (date) => {
    const currentDate = new Date();
    const postDate = new Date(date);
    const timeDifference = currentDate.getTime() - postDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);

    // Define time intervals in seconds
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;

    return (
      secondsDifference < minute ? 'just now' :
      secondsDifference < hour ? `${Math.floor(secondsDifference / minute)} ${Math.floor(secondsDifference / minute) === 1 ? 'minute' : 'minutes'} ago` :
      secondsDifference < day ? `${Math.floor(secondsDifference / hour)} ${Math.floor(secondsDifference / hour) === 1 ? 'hour' : 'hours'} ago` :
      secondsDifference < month ? `${Math.floor(secondsDifference / day)} ${Math.floor(secondsDifference / day) === 1 ? 'day' : 'days'} ago` :
      secondsDifference < year ? `${Math.floor(secondsDifference / month)} ${Math.floor(secondsDifference / month) === 1 ? 'month' : 'months'} ago` :
      `${Math.floor(secondsDifference / year)} ${Math.floor(secondsDifference / year) === 1 ? 'year' : 'years'} ago`
    );
  };

  const fetchReplies = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://localhost:9000/v1/users/foreign/get/followers/${parentId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      setReplies(responseData.followers || []);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await fetch(`http://localhost:9000/v1/users/${parentId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: newReply })
      });
      setNewReply('');
      fetchReplies();
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [parentId]);

  return (
    <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)} style={styles.modal}>
    <KeyboardAvoidingView style={styles.modalContent} behavior="padding" enabled>
      <ScrollView style={styles.scrollView}>
        <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 15, }}>Followers</Text>
      
      
      
           {replies.length > 0 ? (
  <FlatList
    data={replies}
    horizontal={false}
    renderItem={({ item }) => (
      <View style={{ marginVertical: 5, backgroundColor: 'white', padding: 5, borderRadius: 5, flexDirection: 'row' }}>
        {item.avatarPic || (item.user && item.user.avatarPic) ? (
          <Image
            source={{ uri: item.avatarPic || item.user.avatarPic }}
            style={{ width: 40, height: 40, borderRadius: 0, marginRight: 15 }}
          />
        ) : (
          <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
         <Ionicons name="person-add-sharp" size={30} color="#ccc" />
        
          </View>
        )}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.name || item.user.name}</Text>
          <Text style={{ fontWeight: 'normal', fontSize: 12, color:'#777' }}>{item.username || item.user.username}</Text>
        </View>
           <TouchableOpacity
      style={{ backgroundColor: '#262626', padding: 10, borderRadius: 5, justifyContent: 'center' }}
      onPress={() => navigation.navigate('Profiler', { profileparam: item.user.username })}
    >
    
          <Text style={{ color: 'white' , fontWeight:'bold'}}>VISIT PROFILE</Text>
        </TouchableOpacity>
      </View>
    )}
    keyExtractor={(item, index) => index.toString()}
  />
) : (
  null
)}
      
      
      
      
      </ScrollView>
     
      <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)', // White background
  },
  modalContent: {
    flex: 1,
  },
  swipeableView: {
    flex: 1,
  },
  slideContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageBubble: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
  },
  messageText: {
    fontSize: 16,
  },
  messageDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  input: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  closeButton: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
    marginBottom:7
  },
  closeButtonText: {
    fontWeight: 'bold',
    color:'black'
  },
});

export default GetFollowers;
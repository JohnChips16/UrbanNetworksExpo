import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, TextInput , KeyboardAvoidingView, ScrollView} from 'react-native';
import SwipeableViews from 'react-native-swipeable-view';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalComponent = ({ parentId, modalVisible, setModalVisible }) => {
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');

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
      const res = await fetch(`http://localhost:9000/v1/users/replies/${parentId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      setReplies(responseData.replies || []);
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
        <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 15, }}>Replies</Text>
        <SwipeableViews btnsArray={[]} style={styles.swipeableView}>
          {replies.map(reply => (
            <View key={reply._id} style={styles.slideContainer}>
              <View style={styles.commentContainer}>
                <Image source={{ uri: reply.author.avatarPic }} style={styles.avatar} />
                <View style={styles.commentContent}>
                  <Text style={styles.author}>{reply.author.fullname}</Text>
                  <View style={styles.messageBubble}>
                    <Text style={styles.messageText}>{reply.message}</Text>
                    <Text style={styles.messageDate}>{renderRelativeDate(reply.date)}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </SwipeableViews>
      </ScrollView>
      <TextInput
        style={styles.input}
        value={newReply}
        onChangeText={setNewReply}
        placeholder="Add a reply..."
        onSubmitEditing={handleSubmit}
      />
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

export default ModalComponent;
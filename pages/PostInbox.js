import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const PostInbox = () => {
  const [thisEmail, setThisEmail] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [sending, setSending] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch("http://localhost:9000/v1/users/sys/whoami/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      setThisEmail(responseData._DATA.email);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProfile();
    setRefreshing(false);
  }, []);

  const handleSubmit = async () => {
    if (!thisEmail || !to || !subject || !message) {
      Alert.alert("All fields are required and must be valid emails");
      return;
    }

    setSending(true);

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch("http://localhost:9000/v1/users/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          from: thisEmail,
          to,
          subject,
          message,
        }),
      });

      if (response.ok) {
        Alert.alert("Email sent successfully");
      } else {
        Alert.alert("Failed to send email");
      }
    } catch (err) {
      console.error(err.message);
      Alert.alert("An error occurred while sending email");
    } finally {
      setSending(false);
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container} 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TextInput
        style={styles.input}
        placeholder="From"
        value={thisEmail}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="To"
        value={to}
        onChangeText={setTo}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Compose mail..."
        value={message}
        onChangeText={setMessage}
        multiline
      />
      {sending ? (
        <ActivityIndicator size="large" color="#4285F4" style={styles.progressBar} />
      ) : (
        <MaterialIcons.Button 
          name="send" 
          backgroundColor="blue" 
          onPress={handleSubmit}
          style={styles.sendButton}
        >
          Send
        </MaterialIcons.Button>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 7,
    borderColor: '#ccc',
    backgroundColor:'#fff',
    borderBottomWidth: 1,
    marginBottom: 15,
    borderRadius: 0,
    fontSize: 16,
    color:'#bbb'
  },
  textArea: {
    width: '100%',
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 0,
    fontSize: 16,
    height: 200,
  },
  sendButton: {
    width: '100%',
    justifyContent: 'center',
  },
  progressBar: {
    marginTop: 15,
  },
});

export default PostInbox;
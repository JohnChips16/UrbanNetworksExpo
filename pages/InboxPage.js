import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const InboxPage = ({ route }) => {
  const { idEmail } = route.params;
  const [emails, setEmails] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInbox = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://localhost:9000/v1/users/em/${idEmail}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const responseData = await res.json();
      // Assuming responseData is an object and you want to render a single email
      setEmails([responseData]); // Convert responseData to array and set state
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchInbox();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchInbox();
    setRefreshing(false);
  };

  const renderIncome = ({ item }) => (
    <View style={styles.itemContainer}>
 
      <View style={styles.textContainer}>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.from}>{item.from}</Text>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{item.message}</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>from : {item.from}</Text>
   
          <Text style={styles.message}>to : {item.to}</Text>
                 <Text style={styles.message}>Email ID : {item._id}</Text>
          <Text style={styles.message}>favorite : {Boolean(item.favorite)}</Text>
          <Text style={styles.message}>updated at {new Date(item.updatedAt).toLocaleDateString()}</Text>
     
        </View>
        <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {emails.length === 0 ? (
          <Text style={styles.emptyText}>No emails found.</Text>
        ) : (
          <FlatList
            data={emails}
            keyExtractor={(item) => item._id}
            renderItem={renderIncome}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f0f0f0',
  },
  iconContainer: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom:60,
    
  },
  textContainer: {
    flex: 1,
  },
  subject: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  from: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  messageContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 0,
    marginVertical: 5,
  },
  message: {
    fontSize: 14,
    color: '#777',
  },
  date: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'right',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#aaa',
  },
});

export default InboxPage;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const Inbox = () => {
  const navigation = useNavigation();
  const [inbox, setInbox] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInbox = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch("http://localhost:9000/v1/users/GET/email/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const responseData = await res.json();
      const data = responseData.mailbox?.inbox || [];
      setInbox(data);
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
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('InboxPage', { idEmail: item._id })}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name="person" size={24} color="#555" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.from}>{item.from}</Text>
        <Text style={styles.message}>
          {item.message.length > 150 ? `${item.message.substring(0, 150)}...` : item.message}
        </Text>
        <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {inbox.length === 0 ? (
        <Text style={styles.emptyText}>No emails found.</Text>
      ) : (
        <FlatList
          data={inbox}
          keyExtractor={(item) => item._id}
          renderItem={renderIncome}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
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
    marginBottom: 30,
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
  message: {
    fontSize: 14,
    color: '#777',
    marginVertical: 2,
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

export default Inbox;
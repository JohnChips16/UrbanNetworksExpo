import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Connections = ({ combinedData }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="people-sharp" size={24} color="black" />
        <Text style={styles.headerText}>Connections</Text>
      </View>

      {combinedData.length > 0 ? (
        <FlatList
          data={combinedData}
          horizontal={true}
          renderItem={({ item }) => (
            <View style={styles.textBox}>
              {item.avatarPic || (item.user && item.user.avatarPic) ? (
                <Image
                  source={{ uri: item.avatarPic || item.user.avatarPic }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.noAvatarContainer}>
                  <Ionicons name="person-circle-sharp" size={70} color="black" />
                  <Text style={styles.noAvatarText}>No Profile Picture</Text>
                </View>
              )}
              <Text style={styles.info}>{item.fullname || item.user.fullname}</Text>
              <Text style={styles.info}>{item.about || item.user.about}</Text>
              <Text style={styles.info}>{item.schoolOrUniversity}</Text>
              <Text style={styles.info}>{item.degree} {item.startYear} - {item.graduatedYear}</Text>
              <Text style={styles.info}>{item.specialization}</Text>
              {item.location && <Text style={styles.info}>currently at {item.location}</Text>}
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Visit</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noDataText}>No data available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },
  headerText: {
    color: 'black',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  textBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 0.4,
    borderColor: 'lightgrey',
    marginRight: 10,
  },
  info: {
    color: 'black',
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 5,
    alignSelf: 'center',
  },
  noAvatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noAvatarText: {
    color: 'black',
    marginBottom: 5,
  },
  noDataText: {
    color: 'black',
    marginTop: 20,
    textAlign: 'center',
  },
  submitButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#4f4ff5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Connections;
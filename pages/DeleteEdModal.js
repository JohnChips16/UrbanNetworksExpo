import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
const DeleteModal = ({ operation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    // Validate if ID is provided
    if (!id) {
      console.error('ID is required');
      return;
    }

    // Send the request to delete the item
    try {
      const token = await AsyncStorage.getItem('token');
    
      const response = await fetch(`http://localhost:9000/v1/users/delete/attachment?operation=${operation}&id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // localStorage not available in React Native, use AsyncStorage instead
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      closeModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={openModal}>
        <Text>Delete</Text>
      </TouchableOpacity>
      <Modal visible={isOpen} animationType="slide">
        <View>
          <TouchableOpacity onPress={closeModal}>
            <Text style={{marginLeft:15, paddingBottom:15, marginTop:25, borderBottomWidth:0.5, borderColor:'#ccc'}}>Close</Text>
          </TouchableOpacity>
          <TextInput
            value={id}
            onChangeText={setId}
            placeholder="ID"
            style={{borderWidth:1, marginTop:20, marginLeft:15, marginRight:20, padding:5, marginBottom:20, borderColor:'#ccc', backgroundColor:'#eee'}}
          />
       <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, paddingLeft:20 }}>
  <Button
    title="save"
    onPress={handleSubmit}
    color="blue"
    titleStyle={{ textTransform: 'none' }} // Set textTransform to 'none' to prevent capitalization
  />
</View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:25,
    backgroundColor:'#fff',
    paddingTop:25
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 20,
    marginLeft:20,
    backgroundColor:'#fff',
    marginTop:50
  },
  
  textContainer: {
    marginLeft: 20,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color:'#252525'
  },
  usernameText: {
    fontSize: 18,
    marginTop: 5,
  },
  aboutText: {
    fontSize: 16,
    marginTop: 15,
    marginLeft:15,
    paddingBottom:15
  },
  aboutText1: {
    fontSize: 16,
    marginTop: 15,
    marginLeft:15,
    paddingBottom:15,
    color:'#aaa'
  },
  boldText: {
    fontWeight: 'bold',
  },
  blueText: {
    color: 'blue',
  },
    inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 20,
    marginLeft:20,
    backgroundColor:'#fff'
  },
});

export default DeleteModal;
import React, { useState } from 'react';
import { View, Text, Button, Modal, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadModal = () => {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false); // State for avatar modal
  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false); // State for background modal
  const [file, setFile] = useState(null);

  const openAvatarModal = () => {
    setIsAvatarModalOpen(true);
  };

  const closeAvatarModal = () => {
    setIsAvatarModalOpen(false);
  };

  const openBackgroundModal = () => {
    setIsBackgroundModalOpen(true);
  };

  const closeBackgroundModal = () => {
    setIsBackgroundModalOpen(false);
  };

  const handleFileChange = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Permission to access media library is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!pickerResult.cancelled) {
        setFile(pickerResult.assets[0].uri);
      } else {
        console.log('File selection canceled');
      }
    } catch (error) {
      console.error('Error selecting file:', error);
    }
  };

  
  const handleSubmitAvatar = async () => {
    if (!file) {
      console.error('Please select a file');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', {
        uri: file,
        name: 'image.jpg',
        type: 'image/jpg',
      });

      const response = await fetch('http://localhost:9000/v1/users/post/avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Avatar uploaded successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmitBackground = async () => {
    if (!file) {
      console.error('Please select a file');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', {
        uri: file,
        name: 'image.jpg',
        type: 'image/jpg',
      });

      const response = await fetch('http://localhost:9000/v1/users/post/background', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Background uploaded successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <View>
      <TouchableOpacity onPress={openAvatarModal}>
        <Text style={{marginLeft:15, marginTop:15, borderBottomWidth:0.7, borderColor:'#ccc', paddingBottom:10}}>Upload Avatar</Text>
      </TouchableOpacity>
      <Modal visible={isAvatarModalOpen} animationType="slide">
        <View>
          <TouchableOpacity onPress={closeAvatarModal}>
            <Text style={{marginLeft:15, paddingBottom:15, marginTop:25, borderBottomWidth:0.5, borderColor:'#ccc'}}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFileChange}>
            <Text style={{textAlign:'center', justifyContent:'center', alignItems:'center', marginTop:70, marginBottom:70}}>{file ? file : 'Select File'}</Text>
      
          </TouchableOpacity>
          <View style={{alignItems:'center'}}>
          {file && <Image source={{ uri: file }} style={{ width: 200, height: 200, textAlign:'center', justifyContent:'center', alignItems:'center', marginBottom:40}} />}
          </View>
          <Button onPress={handleSubmitAvatar} title="Upload Avatar" color="blue" />
        </View>
      </Modal>
      <TouchableOpacity onPress={openBackgroundModal}>
        <Text style={{marginLeft:15, marginTop:15, paddingBottom:10}}>Upload Background</Text>
      </TouchableOpacity>
      <Modal visible={isBackgroundModalOpen} animationType="slide">
        <View>
          <TouchableOpacity onPress={closeBackgroundModal}>
           <Text style={{marginLeft:15, paddingBottom:15, marginTop:25, borderBottomWidth:0.5, borderColor:'#ccc'}}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFileChange}>
           <Text style={{textAlign:'center', justifyContent:'center', alignItems:'center', marginTop:70, marginBottom:70}}>{file ? file : 'Select File'}</Text>
          </TouchableOpacity>
          {file && <Image source={{ uri: file }} style={{ width: 200, height: 200 }} />}
          <Button onPress={handleSubmitBackground} title="Upload Background" color="blue" />
        </View>
      </Modal>
    </View>
  );
};

export default UploadModal;
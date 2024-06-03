import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';

const NewPost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [token, setToken] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('token');
      if (userToken !== null) {
        setToken(userToken);
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        console.error('Permission to access media library is required!');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.assets[0].uri);
      } else {
        console.log('Image selection canceled');
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('caption', caption);
      if (image) {
        const localUri = image;
        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        formData.append('image', { uri: localUri, name: filename, type });
      }

      setUploading(true);
      setProgress(0);

      const response = await fetch('http://localhost:9000/v1/users/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        onUploadProgress: (event) => {
          const progress = event.loaded / event.total;
          setProgress(progress);
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setUploading(false);
      setProgress(1);

      // If successful, display an alert
      Alert.alert('Success', 'Post submitted successfully');
    } catch (error) {
      console.error('Error submitting post:', error);
      setUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{
          marginBottom: 20,
          fontSize: 18,
          backgroundColor: 'white',
          paddingVertical: 20,
          paddingHorizontal: 20,
          borderBottomWidth: 0.7,
          borderColor: '#ccc',
          color: 'black',
        }}
        placeholder="Enter caption"
        value={caption}
        onChangeText={text => setCaption(text)}
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top" // Align text vertically to the top
      />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: '100%', height: 200 }}
          resizeMode="cover"
        />
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, marginTop: 20 }}>
        <View style={{ marginLeft: 15 }}>
          <Button
            title="UPLOAD IMAGE"
            onPress={pickImage}
            color="blue"
          />
        </View>
        <View style={{ marginRight: 15 }}>
          <Button
            title="CREATE POST"
            onPress={handleSubmit}
            color="#262636"
          />
        </View>
      </View>
      {uploading && (
        <View style={{ marginTop: 20 }}>
          <Progress.Bar progress={progress} width={null} />
        </View>
      )}
    </View>
  );
};

export default NewPost;
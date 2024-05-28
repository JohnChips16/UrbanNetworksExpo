import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet,FlatList, ScrollView, Clipboard, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import EditModal from './EdModal'
import PostEdModal from './PostEdModal'
import DeleteModal from './DeleteEdModal'
import UploadModal from './UploadModal'
const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [about, setAbout] = useState('');
  const [location, setLocation] = useState('');
  const [attach, setAttach] = useState({});
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Token retrieved, do something with it if needed
        } else {
          // Token not found, handle accordingly
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch("http://localhost:9000/v1/users/sys/whoami/", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const responseData = await res.json();
        setAttach(responseData || {});
        
      } catch (err) {
        console.error(err.message);
      }
    };
    
    fetchProfile()
    fetchToken();
  }, []);

   


  const handleSubmit = (fieldName) => {
    let fieldToUpdate = {}; 

    if (fieldName === 'username') {
      fieldToUpdate = { username };
    } else if (fieldName === 'fullname') {
      fieldToUpdate = { fullname };
    } else if (fieldName === 'about') {
      fieldToUpdate = { about };
    } else if (fieldName === 'location') {
      fieldToUpdate = { location };
    }

    AsyncStorage.getItem('token')
      .then(token => {
        fetch('http://localhost:9000/v1/users/edit/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` // Use token retrieved from AsyncStorage
          },
          body: JSON.stringify(fieldToUpdate),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          // Handle success response
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle error
        });
      })
      .catch(error => {
        console.error('Error retrieving token:', error);
      });
  };
  
  
  const renderEducation = ({ item }) => {
    const copyToClipboard = () => {
    Clipboard.setString(item._id);
    alert('ID copied to clipboard!');
  };
    return (
      <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#eee' }}>
     <Text>
  <Text style={styles.boldText}>studying </Text>
  <Text style={styles.boldText}>{item.degree}</Text>
  <Text> at </Text>
  <Text style={styles.boldText}>{item.schoolOrUniversity}</Text>
  <Text style={styles.blueText}> {item.startYear} - {item.graduatedYear}</Text>
</Text>
        {item.specialization && <Text style={styles.specializationText}>Specialized in {item.specialization}</Text>}
        <TouchableOpacity onPress={copyToClipboard}>
      <Text style={{ color: 'blue' }}>ID : {item._id}</Text>
    </TouchableOpacity>
    <EditModal operation="Ed"/>
    <PostEdModal operation="Ed"/>
    <DeleteModal operation="Ed"/>
      </View>
    );
  };

    const renderAwards = ({ item }) => {
      const copyToClipboard = () => {
    Clipboard.setString(item._id);
    alert('ID copied to clipboard!');
  };
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#eee' }}>
      <Text><Text style={styles.boldText}>Awarded with {item.title}</Text>, associated with <Text style={styles.boldText}>{item.associatedWith}</Text> at <Text style={styles.blueText}>{item.date}</Text></Text>
      <Text>Description: {item.desc}</Text>
           <TouchableOpacity onPress={copyToClipboard}>
      <Text style={{ color: 'blue' }}>ID : {item._id}</Text>
    </TouchableOpacity>
          <EditModal operation="Awrd"/>
          <PostEdModal operation="Awrd"/>
          <DeleteModal operation="Awrd"/>
    </View>
  );
};

const renderCertificates = ({ item }) => {
  const copyToClipboard = () => {
    Clipboard.setString(item._id);
    alert('ID copied to clipboard!');
  };
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#eee' }}>
      <Text><Text style={styles.boldText}>{item.CertName} </Text></Text>
      <Text>Authority: {item.CertAuthority}</Text>
      <Text>License Number: {item.LicenseNum}</Text>
      <Text>Validity: {item.dateFrom} - {item.dateThen}</Text>
      <Text>License URL: {item.LicenseUrl}</Text>
          <TouchableOpacity onPress={copyToClipboard}>
      <Text style={{ color: 'blue' }}>ID : {item._id}</Text>
    </TouchableOpacity>
          <EditModal operation="cert"/>
          <PostEdModal operation="cert"/>
          <DeleteModal operation="cert"/>
    </View>
  );
};

const renderProjects = ({ item }) => {
  const copyToClipboard = () => {
    Clipboard.setString(item._id);
    alert('ID copied to clipboard!');
  };
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#eee' }}>
      <Text><Text style={styles.boldText}>{item.projectName}</Text></Text>
      <Text>Associated with: {item.associateWith}</Text>
      <Text>Date: {item.dateNow} - {item.dateThen}</Text>
      <Text>URL: {item.projectUrl}</Text>
      <Text>Description: {item.desc}</Text>
         <TouchableOpacity onPress={copyToClipboard}>
      <Text style={{ color: 'blue' }}>ID : {item._id}</Text>
    </TouchableOpacity>
          <EditModal operation="proj"/>
          <PostEdModal operation="proj"/>
          <DeleteModal operation="proj"/>
    </View>
  );
};

const renderPublications = ({ item }) => {
  const copyToClipboard = () => {
    Clipboard.setString(item._id);
    alert('ID copied to clipboard!');
  };
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#eee' }}>
      <Text><Text style={styles.boldText}>{item.title}</Text></Text>
      <Text>Authors: {item.authors.join(', ')}</Text>
      <Text>Publisher: {item.publisher}</Text>
      <Text>Date: {item.pubDate}</Text>
      <Text>URL: {item.pubUrl}</Text>
      <Text>Description: {item.desc}</Text>
         <TouchableOpacity onPress={copyToClipboard}>
      <Text style={{ color: 'blue' }}>ID : {item._id}</Text>
    </TouchableOpacity>
          <EditModal operation="pub"/>
          <PostEdModal operation="pub"/>
          <DeleteModal operation="pub"/>
    </View>
  );
};

const renderOrganizations = ({ item }) => {
  const copyToClipboard = () => {
    Clipboard.setString(item._id);
    alert('ID copied to clipboard!');
  };
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#eee' }}>
      <Text><Text style={styles.boldText}>{item.orgName}</Text></Text>
      <Text>Position: {item.positionHeld}</Text>
      <Text>Date: {item.dateFrom} - {item.dateThen}</Text>
      <Text>Description: {item.description}</Text>
       <TouchableOpacity onPress={copyToClipboard}>
      <Text style={{ color: 'blue' }}>ID : {item._id}</Text>
    </TouchableOpacity>
          <EditModal operation="org"/>
          <PostEdModal operation="org"/>
          <DeleteModal operation="org"/>
    </View>
  );
};

const renderLanguages = ({ item }) => {
  const copyToClipboard = () => {
    Clipboard.setString(item._id);
    alert('ID copied to clipboard!');
  };
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#eee' }}>
      
      <Text> {item.proficiency} in {item.language}</Text>
          <EditModal operation="lang"/>
          <PostEdModal operation="lang"/>
          <DeleteModal operation="lang"/>
            <TouchableOpacity onPress={copyToClipboard}>
      <Text style={{ color: 'blue' }}>ID : {item._id}</Text>
    </TouchableOpacity>
    </View>
  );
};

const renderExternals = ({ item }) => {
  const copyToClipboard = () => {
    Clipboard.setString(item._id);
    alert('ID copied to clipboard!');
  };
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#eee' }}>
      <Text>Description: {item.description}</Text>
      <Text>Attachment URL: {item.attachment}</Text>
          <EditModal operation="external"/>
          <PostEdModal operation="external"/>
          <DeleteModal operation="external"/>
             <TouchableOpacity onPress={copyToClipboard}>
      <Text style={{ color: 'blue' }}>ID : {item._id}</Text>
    </TouchableOpacity>
    </View>
  );
};

const renderSkills = ({ item }) => {
  const copyToClipboard = () => {
    Clipboard.setString(item._id);
    alert('ID copied to clipboard!');
  };
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#eee' }}>
      <Text><Text style={styles.boldText}>{item.skill}</Text></Text>
      <Text>{item.description}</Text>
         <TouchableOpacity onPress={copyToClipboard}>
      <Text style={{ color: 'blue' }}>ID : {item._id}</Text>
    </TouchableOpacity>
          <EditModal operation="skill"/>
          <PostEdModal operation="skill"/>
          <DeleteModal operation="skill"/>
    </View>
  );
};

const renderScores = ({ item }) => {
  const copyToClipboard = () => {
    Clipboard.setString(item._id);
    alert('ID copied to clipboard!');
  };
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#eee' }}>
      <Text>{item.testName}</Text>
      <Text>Associated with: {item.associatedWith}</Text>
      <Text>Score: {item.score}</Text>
      <Text>Date: {item.testDate}</Text>
      <Text>Description: {item.desc}</Text>
         <TouchableOpacity onPress={copyToClipboard}>
      <Text style={{ color: 'blue' }}>ID : {item._id}</Text>
    </TouchableOpacity>
          <EditModal operation="score"/>
          <PostEdModal operation="score"/>
          <DeleteModal operation="score"/>
    </View>
  );
};

  

  return (
    <ScrollView style={styles.container}>
    <Text style={{fontWeight:'bold', fontSize:18, marginLeft:18, paddingBottom:15}}>Profile</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <Ionicons
          name="paper-plane"
          size={24}
          color="#ccc"
          onPress={() => handleSubmit('username')}
          style={{marginRight:10}}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Fullname"
          value={fullname}
          onChangeText={text => setFullname(text)}
        />
        <Ionicons
          name="paper-plane"
          size={24}
          color="#ccc"
          onPress={() => handleSubmit('fullname')}
          style={{marginRight:10}}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="About"
          value={about}
          onChangeText={text => setAbout(text)}
        />
        <Ionicons
          name="paper-plane"
          size={24}
          color="#ccc"
          onPress={() => handleSubmit('about')}
         style={{marginRight:10}} 
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={text => setLocation(text)}
        />
        <Ionicons
          name="paper-plane"
          size={24}
          color="#ccc"
          onPress={() => handleSubmit('location')}
          style={{marginRight:10}}
        />
      </View>
      <UploadModal/>
       {attach.ed && attach.ed.length > 0 && (
          <FlatList
            data={attach.ed}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderEducation}
          />
        )}
        {attach.awrd && attach.awrd.length > 0 && (
          <>
            <Text style={styles.aboutText}><Entypo name="flag" size={24} color="black" />  <Text style={styles.boldText}>Awards </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={attach.awrd}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderAwards}
            />
          </>
        )}
        {attach.cert && attach.cert.length > 0 && (
          <>
            <Text style={styles.aboutText}><Entypo name="flag" size={24} color="black" />  <Text style={styles.boldText}>Certification </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={attach.cert}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderCertificates}
            />
          </>
        )}
        {attach.proj && attach.proj.length > 0 && (
          <>
            <Text style={styles.aboutText}><Entypo name="flag" size={24} color="black" />  <Text style={styles.boldText}>Projects </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={attach.proj}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderProjects}
            />
          </>
        )}
        {attach.pub && attach.pub.length > 0 && (
          <>
            <Text style={styles.aboutText}><Entypo name="flag" size={24} color="black" />  <Text style={styles.boldText}>Publications </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={attach.pub}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderPublications}
            />
          </>
        )}
        {attach.org && attach.org.length > 0 && (
          <>
            <Text style={styles.aboutText}><Entypo name="flag" size={24} color="black" />  <Text style={styles.boldText}>Organizations </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={attach.org}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderOrganizations}
            />
          </>
        )}
        {attach.lang && attach.lang.length > 0 && (
          <>
            <Text style={styles.aboutText}><Entypo name="flag" size={24} color="black" />  <Text style={styles.boldText}>Languages </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={attach.lang}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderLanguages}
            />
          </>
        )}
        {attach.score && attach.score.length > 0 && (
          <>
            <Text style={styles.aboutText}><Entypo name="flag" size={24} color="black" />  <Text style={styles.boldText}>Tests </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={attach.score}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderScores}
            />
          </>
        )}
        {attach.external && attach.external.length > 0 && (
          <>
            <Text style={styles.aboutText}><Entypo name="flag" size={24} color="black" />  <Text style={styles.boldText}>Externals </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={attach.external}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderExternals}
            />
          </>
        )}
        {attach.skill && attach.skill.length > 0 && (
          <>
            <Text style={styles.aboutText}><Entypo name="flag" size={24} color="black" />  <Text style={styles.boldText}>Skills </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={attach.skill}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderSkills}
            />
          </>
        )}
    </ScrollView>
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
    backgroundColor:'#fff'
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
});


export default EditProfile;
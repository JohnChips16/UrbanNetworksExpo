import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import ProfPostForeign from './foreignpost'
import HorizontalCarouselWithItems from './Carousel'
import GetFollowers from './GetFollowersModal'
import GetFollowing from './GetFollowingModal'
import { useRoute, useNavigation } from '@react-navigation/native';
const ProfilerScreen = () => {
  const [profile, setProfile] = useState({ user: {} });
  const [attach, setAttach] = useState({});
  const [thisId, setThisId] = useState("")
  const [ovpost, Setovpost] = useState([]);
  const [followersCount, setFollowersCount] = useState("")
  const [followingCount, setFollowingCount] = useState("")
  const [getFollowers, setGetFollowers] = useState([])
  const [getFollowing, setGetFollowing] = useState([])
  const [operation, setOperation] = useState("")
  const [refreshing, setRefreshing] = useState(false);
   const route = useRoute();
  const navigation = useNavigation();
  const { profileparam } = route.params;
const [modalVisible, setModalVisible] = useState(false);
const [modalVisibleX, setModalVisibleX] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const toggleModal0 = () => {
    setModalVisibleX(!modalVisibleX);
  };

  React.useEffect(() => {
    navigation.setOptions({ title: `Profile: ${profileparam}` });
  }, [navigation, profileparam]);
const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(`http://localhost:9000/v1/users/wwwparf/get/?who=${profileparam}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const responseData = await res.json();
        setProfile(responseData);
        
      } catch (err) {
        console.error(err.message);
      }
    };
const fetchThisId = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(`http://localhost:9000/v1/users/sys/whoami`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const responseData = await res.json();
        setThisId(responseData._DATA._id);
        
      } catch (err) {
        console.error(err.message);
      }
    };
    
    const ovass = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch("http://localhost:9000/v1/users/bfn/thisqueryfuckyou/?limit=5", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const responseData = await res.json();
        Setovpost(responseData)
      } catch (err) {
        console.error(err.message);
      }
    };
    const fetchFollowers = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(`http://localhost:9000/v1/users/foreign/get/followers/${profile.user.id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const responseData = await res.json();
        setFollowersCount(responseData.totalFollowers)
        setGetFollowers(responseData.followers)
      } catch (err) {
        console.error(err.message);
      }
    };
    const fetchFollowing = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(`http://localhost:9000/v1/users/foreign/get/following/${profile.user.id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const responseData = await res.json();
        setFollowingCount(responseData.totalFollowers)
        setGetFollowing(responseData.following)
      } catch (err) {
        console.error(err.message);
      }
    };

  useEffect(() => {
    

    fetchProfile();
    fetchFollowers()
    fetchFollowing()
    ovass()
    fetchThisId()
    
  }, []);


const followUser = async (userId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Token not found');
        return;
      }

      const response = await fetch(`http://localhost:9000/v1/users/follow/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse response to get operation
        setOperation(responseData.operation); // Update operation state
        Alert.alert('Success', 'You have followed the user');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };

const renderProfile = () => {
    const isFollowing = operation === 'unfollow';

    return (
      <View style={styles.container}>
        {profile.user.backgroundPic ? (
          <Image source={{ uri: profile.user.backgroundPic }} style={styles.backgroundImage} />
        ) : (
          <View style={{ paddingBottom: 120, backgroundColor: '#ccc' }} />
        )}
        <View style={styles.profileInfoContainer}>
          {profile.user.avatarPic && (
            <Image source={{ uri: profile.user.avatarPic }} style={styles.avatarImage} />
          )}
          {/*<Text>{operation}</Text>*/}
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{profile.user.fullname || profile.user.schoolOrUniversity}</Text>
            
          </View>
          {profile.user.id !== thisId && (
            <TouchableOpacity
  style={{
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
  }}
  onPress={() => followUser(profile.user.id)}
>
  <Text style={{ fontWeight: 'bold', color: 'white' }}>
    {operation === 'follow' ? 'Follow' : 'Follow/Unfollow'}
  </Text>
</TouchableOpacity>
            )}
        </View>
        <View style={{ padding: 7, backgroundColor: '#ddd' }}></View>
        <Text style={styles.aboutText}>
          <Text style={styles.boldText}>About this user</Text>
        </Text>
        <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
        <Text style={styles.aboutText}>{profile.user.about}</Text>
        
         <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.aboutText}>{followersCount} followers</Text>
      </TouchableOpacity>

      <GetFollowers 
        parentId={profile.user.id}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
         <TouchableOpacity onPress={toggleModal0}>
        <Text style={styles.aboutText}>{followingCount} following</Text>
      </TouchableOpacity>

      <GetFollowing 
        parentId={profile.user.id}
        modalVisible={modalVisibleX}
        setModalVisible={setModalVisibleX}
      />
        
        <Text style={styles.aboutText1}>{profile.user.location}</Text>
        <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
      </View>
    );
  };


  const renderEducation = ({ item }) => {
    return (
      <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#fff' }}>
     <Text>
  <Text style={styles.boldText}>studying </Text>
  <Text style={styles.boldText}>{item.degree}</Text>
  <Text> at </Text>
  <Text style={styles.boldText}>{item.schoolOrUniversity}</Text>
  <Text style={styles.blueText}> {item.startYear} - {item.graduatedYear}</Text>
</Text>
        {item.specialization && <Text style={styles.specializationText}>Specialized in {item.specialization}</Text>}
      </View>
    );
  };

    const renderAwards = ({ item }) => {
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#fff' }}>
      <Text><Text style={styles.boldText}>Awarded with {item.title}</Text>, associated with <Text style={styles.boldText}>{item.associatedWith}</Text> at <Text style={styles.blueText}>{item.date}</Text></Text>
      <Text>Description: {item.desc}</Text>
    </View>
  );
};

const renderCertificates = ({ item }) => {
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#fff' }}>
      <Text><Text style={styles.boldText}>{item.CertName} </Text></Text>
      <Text>Authority: {item.CertAuthority}</Text>
      <Text>License Number: {item.LicenseNum}</Text>
      <Text>Validity: {item.dateFrom} - {item.dateThen}</Text>
      <Text>License URL: {item.LicenseUrl}</Text>
    </View>
  );
};

const renderProjects = ({ item }) => {
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#fff' }}>
      <Text><Text style={styles.boldText}>{item.projectName}</Text></Text>
      <Text>Associated with: {item.associateWith}</Text>
      <Text>Date: {item.dateNow} - {item.dateThen}</Text>
      <Text>URL: {item.projectUrl}</Text>
      <Text>Description: {item.desc}</Text>
    </View>
  );
};

const renderPublications = ({ item }) => {
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#fff' }}>
      <Text><Text style={styles.boldText}>{item.title}</Text></Text>
      <Text>Authors: {item.authors.join(', ')}</Text>
      <Text>Publisher: {item.publisher}</Text>
      <Text>Date: {item.pubDate}</Text>
      <Text>URL: {item.pubUrl}</Text>
      <Text>Description: {item.desc}</Text>
    </View>
  );
};

const renderOrganizations = ({ item }) => {
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#fff' }}>
      <Text><Text style={styles.boldText}>{item.orgName}</Text></Text>
      <Text>Position: {item.positionHeld}</Text>
      <Text>Date: {item.dateFrom} - {item.dateThen}</Text>
      <Text>Description: {item.description}</Text>
    </View>
  );
};

const renderLanguages = ({ item }) => {
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#fff' }}>
      
      <Text> {item.proficiency} in {item.language}</Text>
    </View>
  );
};

const renderExternals = ({ item }) => {
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#fff' }}>
      <Text>Description: {item.description}</Text>
      <Text>Attachment URL: {item.attachment}</Text>
    </View>
  );
};

const renderSkills = ({ item }) => {
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#fff' }}>
      <Text><Text style={styles.boldText}>{item.skill}</Text></Text>
      <Text>{item.description}</Text>
    </View>
  );
};

const renderScores = ({ item }) => {
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#fff' }}>
      <Text>{item.testName}</Text>
      <Text>Associated with: {item.associatedWith}</Text>
      <Text>Score: {item.score}</Text>
      <Text>Date: {item.testDate}</Text>
      <Text>Description: {item.desc}</Text>
    </View>
  );
};

const onRefresh = async () => {
    setRefreshing(true);
    await fetchProfile();
    await ovass();
    await fetchFollowers()
    await fetchFollowing()
    setRefreshing(false);
  };


  // Define other render functions here...


  return (
  <ScrollView
    style={styles.container}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
  >
  
    {Object.keys(profile).length === 0 ? (
      <Text>Loading...</Text>
    ) : (
      <>
        {renderProfile()}
  
    
        <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
        {profile.education && profile.education.length > 0 && (
        <>
            <Text style={styles.aboutText}> <Text style={styles.boldText}>Education </Text></Text>
          <FlatList
            data={profile.education}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderEducation}
          />
          </>
        )}
        {profile.awrd && profile.awrd.length > 0 && (
          <>
            <Text style={styles.aboutText}> <Text style={styles.boldText}>Awards </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={profile.awrd}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderAwards}
            />
          </>
        )}
        {profile.cert && profile.cert.length > 0 && (
          <>
            <Text style={styles.aboutText}> <Text style={styles.boldText}>Certification </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={profile.cert}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderCertificates}
            />
          </>
        )}
        {profile.project && profile.project.length > 0 && (
          <>
            <Text style={styles.aboutText}> <Text style={styles.boldText}>Projects </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={profile.project}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderProjects}
            />
          </>
        )}
        {profile.pub && profile.pub.length > 0 && (
          <>
            <Text style={styles.aboutText}> <Text style={styles.boldText}>Publications </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={profile.pub}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderPublications}
            />
          </>
        )}
        {profile.org && profile.org.length > 0 && (
          <>
            <Text style={styles.aboutText}> <Text style={styles.boldText}>Organizations </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={profile.org}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderOrganizations}
            />
          </>
        )}
        {profile.lang && profile.lang.length > 0 && (
          <>
            <Text style={styles.aboutText}> <Text style={styles.boldText}>Languages </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={profile.lang}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderLanguages}
            />
          </>
        )}
        {profile.test && profile.test.length > 0 && (
          <>
            <Text style={styles.aboutText}> <Text style={styles.boldText}>Tests </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={profile.test}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderScores}
            />
          </>
        )}
        {profile.external && profile.external.length > 0 && (
          <>
            <Text style={styles.aboutText}> <Text style={styles.boldText}>Externals </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={profile.external}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderExternals}
            />
          </>
        )}
        {profile.skill && profile.skill.length > 0 && (
          <>
            <Text style={styles.aboutText}> <Text style={styles.boldText}>Skills </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={profile.skill}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderSkills}
            />
          </>
        )}
        <ProfPostForeign profilerparam={profileparam}/>
      </>
    )}
  </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor:'white'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:100,
    
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth:5,
    borderColor:'#eee'
  },
  textContainer: {
    marginLeft: 20,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color:'#252525',
    paddingBottom:70
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
    color:'#bbb',
    fontWeight:'bold'
  },
  boldText: {
    fontWeight: 'bold',
  },
  blueText: {
    color: 'blue',
  },
});


export default ProfilerScreen;
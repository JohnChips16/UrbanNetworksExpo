import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import ProfPost from './ProfPost'
import HorizontalCarouselWithItems from './Carousel'
const Profile = () => {
  const [profile, setProfile] = useState({});
  const [attach, setAttach] = useState({});
  const [ovpost, Setovpost] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch("http://localhost:9000/v1/users/sys/whoami/", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const responseData = await res.json();
        setProfile(responseData._DATA);
        setAttach(responseData || {});
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

  useEffect(() => {
    

    fetchProfile();
    ovass()
  }, []);

  const renderProfile = () => {
  return (
    <View style={styles.container}>
      {profile.backgroundPic && (
        <Image source={{ uri: profile.backgroundPic }} style={styles.backgroundImage} />
      )}
      <View style={styles.profileInfoContainer}>
        {profile.avatarPic && (
          <Image source={{ uri: profile.avatarPic }} style={styles.avatarImage} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{profile.name || profile.schoolOrUniversity}</Text>
        </View>
      </View>
      <View style={{ padding: 7, backgroundColor: '#ddd' }}></View>
      <Text style={styles.aboutText}>
  
      <Text style={styles.boldText}>About this user </Text></Text>
      <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
      <Text style={styles.aboutText}>{profile.about}</Text>
      <Text style={styles.aboutText1}>{profile.location}</Text>
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
    
        <Text style={styles.aboutText}> <Text style={styles.boldText}>Education </Text></Text>
        <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
        {attach.ed && attach.ed.length > 0 && (
          <FlatList
            data={attach.ed}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderEducation}
          />
        )}
        {attach.awrd && attach.awrd.length > 0 && (
          <>
            <Text style={styles.aboutText}>  <Text style={styles.boldText}>Awards </Text></Text>
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
            <Text style={styles.aboutText}>  <Text style={styles.boldText}>Certification </Text></Text>
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
            <Text style={styles.aboutText}>  <Text style={styles.boldText}>Projects </Text></Text>
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
            <Text style={styles.aboutText}>  <Text style={styles.boldText}>Publications </Text></Text>
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
            <Text style={styles.aboutText}>  <Text style={styles.boldText}>Organizations </Text></Text>
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
            <Text style={styles.aboutText}>  <Text style={styles.boldText}>Languages </Text></Text>
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
            <Text style={styles.aboutText}>  <Text style={styles.boldText}>Tests </Text></Text>
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
            <Text style={styles.aboutText}>  <Text style={styles.boldText}>Externals </Text></Text>
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
            <Text style={styles.aboutText}>  <Text style={styles.boldText}>Skills </Text></Text>
            <View style={{ padding: 0.5, backgroundColor: '#ddd' }}></View>
            <FlatList
              data={attach.skill}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderSkills}
            />
          </>
        )}
        <ProfPost/>
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


export default Profile;
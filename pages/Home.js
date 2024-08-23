import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import FeedJob from './FeedJob'
import FeedPost from './FeedPost'
import Connections from './UiConn'
const Home = ({scrollToTopRef}) => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigation = useNavigation();


  const [resAbout, setResAbout] = useState([])
  const [fetchAlumni, setAlumni] = useState([])
  const [alumni0, setAlumni0] = useState([])
  const [alumni1, setAlumni1] = useState([])
  const [alumni2, setAlumni2] = useState([])
  
  const [isRefreshing, setIsRefreshing] = useState(false);
const [isAtTop, setIsAtTop] = useState(true);
  const scrollViewRef = useRef(null);


  useEffect(() => {
    getProfile();
    getConnectionUserByAbout()
    getConnectionUserByAlumni()
    getConnectionUserByAlumniSS()
    getConnectionUserBySkills()
    getConnectionUserByAttach()
  }, []);
  
  const getProfile = async () => {
      try {
        setIsRefreshing(true)
        const token = await AsyncStorage.getItem('token');
        const res = await fetch("http://localhost:9000/v1/users/sys/whoami/", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const parseData = await res.json();
        setName(parseData._DATA.name);
        setAbout(parseData._DATA.about);
        setEmail(parseData._DATA.email);
        setLocation(parseData._DATA.location);
        setUsername(parseData._DATA.username);
        setPhone(parseData._DATA.phone);
        setId(parseData._DATA._id);
        setAvatar(parseData._DATA.avatarPic);
        setIsRefreshing(false)
      } catch (err) {
        setIsRefreshing(false)
        console.error(err.message);
      }
    };
const getConnectionUserByAbout = async () => {
  try {
    setIsRefreshing(true)
    const token = await AsyncStorage.getItem('token');
    const res = await fetch("http://localhost:9000/v1/users/urb/network/matchby/user/about", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    const responseData = await res.json(); // Use res.json() instead of res.data
    console.log("responseData:", responseData); // Check the structure of the response
    if (responseData && responseData.data && responseData.data.length > 0) {
      setResAbout(responseData.data); // Access the first user object in the array
      setIsRefreshing(false)
    } else {
      setIsRefreshing(false)
      console.log("No data found");
    }
  } catch (err) {
    console.error(err.message);
  }
};

  const getConnectionUserByAlumni = async () => {
  try {
    setIsRefreshing(true)
    const token = await AsyncStorage.getItem('token');
    const res = await fetch("http://localhost:9000/v1/users/urb/network/matchby/alumni", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    const responseData = await res.json();
    if (responseData && responseData.alumni && responseData.alumni.length > 0) {
      setAlumni(responseData.alumni); // Access the first user object in the array
      setIsRefreshing(false)
    } else {
      setIsRefreshing(false)
      console.log("No data found");
    }
  } catch (err) {
    console.error(err.message);
  }
};

const getConnectionUserByAlumniSS = async () => {
  try {
    setIsRefreshing(true)
    const token = await AsyncStorage.getItem('token');
    const res = await fetch("http://localhost:9000/v1/users/urb/network/matchby/alumni/skillspec", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    const responseData = await res.json();
     if (responseData && responseData.alumni && responseData.alumni.length > 0) {
      setAlumni0(responseData.alumni); // Access the first user object in the array
      setIsRefreshing(false)
    } else {
      setIsRefreshing(false)
      console.log("No data found");
    }
  } catch (err) {
    console.error(err.message);
  }
};

const getConnectionUserBySkills = async () => {
  try {
    setIsRefreshing(true)
    const token = await AsyncStorage.getItem('token');
    const res = await fetch("http://localhost:9000/v1/users/urb/network/matchby/user/skills", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    const responseData = await res.json();
    if (responseData && responseData._data && responseData._data.length > 0) {
      setAlumni1(responseData._data); // Access the first user object in the array
      setIsRefreshing(false)
    } else {
      setIsRefreshing(false)
      console.log("No data found");
    }
  } catch (err) {
    console.error(err.message);
  }
};

const getConnectionUserByAttach = async () => {
  try {
    setIsRefreshing(true)
    const token = await AsyncStorage.getItem('token');
    const res = await fetch("http://localhost:9000/v1/users/urb/network/matchby/user/attach", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    const responseData = await res.json();
    if (responseData && responseData._thiscred && responseData._thiscred.length > 0) {
      setAlumni2(responseData._data); // Access the first user object in the array
      setIsRefreshing(false)
    } else {
      setIsRefreshing(false)
      console.log("No data found");
    }
  } catch (err) {
    console.error(err.message);
  }
};
const combinedData = [...resAbout, ...fetchAlumni, ...alumni0,...alumni1,
...alumni2
];

const handleRefresh = () => {
    setIsRefreshing(true);
getProfile();
    getConnectionUserByAbout()
    getConnectionUserByAlumni()
    getConnectionUserByAlumniSS()
    getConnectionUserBySkills()
    getConnectionUserByAttach()
  };

const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    setIsAtTop(y === 0);
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };


  return (
   <View style={{ flex: 1, backgroundColor:'rgb(248,248,248)' }}>
      <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['blue']}
          />
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
 {combinedData.length > 0 ? (
  <FlatList
    data={combinedData}
    horizontal={false}
    renderItem={({ item }) => (
      <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        {item.avatarPic || (item.user && item.user.avatarPic) ? (
          <Image
            source={{ uri: item.avatarPic || item.user.avatarPic }}
            style={{ width: 40, height: 40, borderRadius: 0, marginRight: 15 }}
          />
        ) : (
          <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', marginRight:0 }}>
            <Ionicons name="person-add-sharp" size={30} color="#ccc" />
          </View>
        )}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item.fullname || item.user.fullname}</Text>
          <Text style={{ fontWeight: 'normal', fontSize: 14, color: '#777' }}>{item.username || item.user.username}</Text>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: '#fff', padding: 10, borderRadius: 5, justifyContent: 'center' }}
          onPress={() => navigation.navigate('Profiler', { profileparam: item.user.username })}
        >
          <Text style={{ color: 'blue', fontWeight: 'bold' }}>VISIT PROFILE</Text>
        </TouchableOpacity>
      </View>
    )}
    keyExtractor={(item, index) => index.toString()}
  />
) : (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="blue" />
  </View>
)}
            <View style={{backgroundColor:'white',alignItems:'center', width:'100%', marginTop:15, justifyContent:'center', backgroundColor:'lightgrey', padding:5,}}>
         
         </View>
 
      <FeedJob/>
      <FeedPost/>
    </ScrollView>
       {!isAtTop && (
        <TouchableOpacity style={styles.floatingButton} onPress={scrollToTop}>
          <Ionicons name="arrow-up-circle" size={70} color="#eee" />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    
    paddingVertical: 20, // Add vertical padding
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20, // Adjust the distance from the bottom
    right: 20,
    backgroundColor: 'transparent',
    zIndex: 1, // Ensure the button is above other content
  },
  textBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 40,
    marginBottom: 20,
    marginRight: 10,
    marginLeft:10,
    marginTop:15,
    // Add right margin to create space between items
    borderWidth: 0.4,
    borderColor: 'lightgrey',
  },
  info: {
    color: 'black',
    marginBottom: 5,
    marginTop:25,
    textAlign: 'center',
    fontWeight:'bold',
    fontSize:16
  },
  info2: {
    color: 'black',
    marginBottom: 5,
    marginTop:5,
    textAlign: 'center',
    paddingBottom:15,
    
    fontSize:17
  },
  info1: {
    color: 'grey',
    marginBottom: 5,
    fontSize:12,
    textAlign: 'center',
    
  },
  info3: {
    color: 'grey',
    marginBottom: 5,
    fontSize:12,
    textAlign: 'center',
    flexWrap:'wrap',
    
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 0,
    alignItems:'center',
    justifyContent: 'center',
    textAlign:'center'
  },
  noAvatarText: {
    color: 'black',
    marginBottom: 5,
    textAlign: 'center',
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
    marginBottom: 10,
    marginTop:10
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputField: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 0,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop:3,
    backgroundColor:'lightgrey'
  },
});



export default Home;
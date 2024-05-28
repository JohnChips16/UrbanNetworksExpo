
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, FlatList, ActivityIndicator } from 'react-native';
import FeedArticle from './FeedArticle'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import FeedNews from './FeedNews'
import EventFeed from './EventFeed'
const FeedPost = () => {
  const navigation = useNavigation();

  const [post, setPost] = useState([])
  const [postloc, setPostloc] = useState([])
  const [postSkill, setPostkill] = useState([])
  const [postSuggest, setPostsuggest] = useState([])
  const [postfeed, setPostFeed] = useState([])
  const [avatar, setAvatar] = useState("")
  
const renderRelativeDate = (date) => {
  const currentDate = new Date();
  const postDate = new Date(date);
  const timeDifference = currentDate.getTime() - postDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);

  // Define time intervals in seconds
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  if (secondsDifference < minute) {
    return 'just now';
  } else if (secondsDifference < hour) {
    const minutes = Math.floor(secondsDifference / minute);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (secondsDifference < day) {
    const hours = Math.floor(secondsDifference / hour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (secondsDifference < month) {
    const days = Math.floor(secondsDifference / day);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (secondsDifference < year) {
    const months = Math.floor(secondsDifference / month);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(secondsDifference / year);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
};
  
  
   const fetchAllPost = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch("http://localhost:9000/v1/users/school/post/fetch/all", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData.data || [];
      setPost(data);
      setAvatar(data.author.avatarPic)
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleAvatarError = () => {
    setAvatar('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYGrDPNl3oSaMEXAT1EmmWlIINRWUvW22u_4vDbWA4RrIVeioZY1Dz88_l&s=10');
  };

   const fetchLocPost = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch("http://localhost:9000/v1/users/school/post/q/matchby/loc", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData.data || [];
      setPostloc(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const fetchKillPost = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch("http://localhost:9000/v1/users/school/post/q/matchby/skills", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData.data || [];
      setPostkill(data);
    } catch (err) {
      console.error(err.message);
    }
  };

 const fetchSuggestPost = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch("http://localhost:9000/v1/users/school/suggested/post/0", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData || [];
      setPostsuggest(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const fetchfeedpost = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch("http://localhost:9000/v1/users/post/feed/0", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData || [];
      setPostFeed(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchAllPost();
    fetchLocPost();
    
    fetchKillPost();
    fetchSuggestPost();
    fetchfeedpost()
  }, []);

  const handleApply = (urlApply) => {
    Linking.openURL(urlApply);
  };

const renderJobItemLinked = ({ item, navigation }) => {
  const renderHashtags = () => {
    if (item.hashtags && item.hashtags.length > 0) {
      return (
        <Text style={styles.hashtags}>{item.hashtags.join(', ')}</Text>
      );
    } else {
      return null;
    }
  };

  const renderCaption = () => {
    if (item.attachment) {
      return (
        <Text style={[styles.description, { marginBottom: 10 }]}>
          {item.caption ? item.caption : 'No data'}
        </Text>
      );
    } else {
      // Calculate font size dynamically based on caption length
      let fontSize = 18;
      if (item.caption && item.caption.length > 50) {
        fontSize = 14;
      }
      return (
        <Text style={[styles.description, { marginBottom: 10, fontSize: fontSize }]}>
          {item.caption ? item.caption : 'No data'}
        </Text>
      );
    }
  };

  return (
    <View style={styles.jobItem}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Conditional rendering for author's avatar */}
        {item.author && item.author.avatarPic ? (
          <Image
            source={{ uri: item.author.avatarPic }}
            style={styles.avatar}
            resizeMode="cover"
          />
        ) : (
          <Ionicons name="person-circle-sharp" size={30} color="blue" style={{ marginRight: 10, marginBottom: 10 }} />
        )}
        <View style={{ display: 'flex', flexDirection: 'column' }}>
        <View style={{display:'flex', flexDirection:'row'}}>
          <Text style={{ marginTop: 5, alignSelf: 'flex-start', marginLeft: 0, paddingBottom: 2, fontWeight: 'bold' }}>
            {item.author && (item.author.fullname || item.author.schoolOrUniversityName)}
          </Text>
       <Text style={{ marginTop: 5, marginLeft: 5, color: '#bbb' }}>@{item.author && item.author.username ? item.author.username : 'urbaners'}</Text>
          </View>
          <Text style={styles.description0}>
            {item.author && item.author.about ? item.author.about : 'No data'}
          </Text>
            <Text style={styles.authorUsername}>Posted {renderRelativeDate(item.date)}</Text>
        </View>
      </View>

      <View style={{ padding: 0.5, backgroundColor: '#eee' }}></View>
      {renderCaption()}
       {renderHashtags()}
      {item.attachment && (
        <Image
          source={{ uri: item.attachment }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
    
     
      <View style={{ padding: 0.5, backgroundColor: '#eee' }}></View>
  {/*
    <TouchableOpacity onPress={() => navigation.navigate("PostPage", { postId: item._id })}>
      <Text style={{marginTop:10}}>View Post</Text>
    </TouchableOpacity>
    */}
         <TouchableOpacity onPress={() => navigation.navigate("PostPage", { postId: item._id })} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>VIEW POST</Text>
      </TouchableOpacity>
    </View>
  );
};


  return (
    <View style={styles.container}>
      {postfeed.length === 0 ? (
    null
      ) : (
 <FlatList
  data={postfeed}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => renderJobItemLinked({ item, navigation })} // Pass navigation prop here
/>
      )}
   
     {postloc.length === 0 ? (
null
) : (
  <FlatList
    data={postloc}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => renderJobItemLinked({ item, navigation })}
  />
)}
      {postSkill.length === 0 ? (
      null
      ) : (
        <FlatList
          data={postSkill}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderJobItemLinked({ item, navigation })}
        />
      )}
      <EventFeed/>
      <FeedNews/>
      <FeedArticle/>
      {post.length === 0 ? (
  null
      ) : (
        <FlatList
          data={post}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderJobItemLinked({ item, navigation })}
        />
      )}
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
    marginBottom:45,
  },
  image: {
    width: '100%',
    height: 350,
    marginTop: 10,
    borderRadius:7
  },
  jobItem: {
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:5
  },
  authorInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  authorName: {
    fontWeight: 'bold',
    marginRight: 5,
    color:'blue',
    
  },
  authorUsername: {
    marginRight: 5,
    color:'#777',
    paddingBottom:7,
    paddingTop:7
  },
  datePosted: {
    color: '#777',
  },
  description: {
    marginBottom: 10,
   marginTop:10
  },
  description0: {
    marginBottom: 10,
    color:'#777',
    
  },
  hashtags: {
    marginBottom: 10,
    fontWeight:'bold',
    color:'blue'
  },
  skillReq: {
    marginBottom: 10,
    color:'#777'
  },
  employeeInfo: {
    marginBottom: 10,
  },
  applyButton: {
    backgroundColor: '#262626',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth:1,
    borderColor:'#ddd',
    marginTop:10
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FeedPost;
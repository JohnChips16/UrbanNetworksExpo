import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, FlatList, ActivityIndicator } from 'react-native';
import FeedArticle from './FeedArticle'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import FeedNews from './FeedNews'
import EventFeed from './EventFeed'
const ProfPostForeign = ({profilerparam}) => {
  const [post, setPost] = useState([])
  const [avatar, setAvatar] = useState("")
  const navigation = useNavigation();

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
      const res = await fetch(`http://localhost:9000/v1/users/wwwparf/get/?who=${profilerparam}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData.posts || [];
      setPost(data);
      setAvatar(data.author.avatarPic)
    } catch (err) {
      console.error(err.message);
    }
  };
 
  useEffect(() => {
    fetchAllPost();
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
    return (
      null
    );
  }
};
  const renderCaption = () => {
    if (item.attachment) {
      return (
        <Text style={[styles.description, { marginBottom: 10 }]}>{item.caption ? item.caption : 'No data'}</Text>
      );
    } else {
      // Calculate font size dynamically based on caption length
      let fontSize = 18;
      if (item.caption && item.caption.length > 50) {
        fontSize = 14;
      }
      return (
        <Text style={[styles.description, { marginBottom: 10, fontSize: fontSize }]}>{item.caption ? item.caption : 'No data'}</Text>
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
        <View style={{display:'flex', flexDirection:'column'}}>
          <Text style={{ marginTop: 5, alignSelf: 'flex-start', marginLeft: 0, paddingBottom: 2, fontWeight: 'bold' }}>
  {item.author && (item.author.fullname || item.author.schoolOrUniversityName)}
</Text>
         <Text style={styles.description0}>{item.author && item.author.about ? item.author.about : 'No data'}</Text>
        </View>
      </View>
     
      <View style={{ padding: 0.5, backgroundColor: '#eee' }}></View>
      {renderCaption()}
          <Text style={styles.authorUsername}>Posted {renderRelativeDate(item.date)}</Text>
      {item.attachment && (
        <Image
          source={{ uri: item.attachment }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
  
      {renderHashtags()}
      <View style={{ padding: 0.5, backgroundColor: '#eee' }}></View>
         <TouchableOpacity onPress={() => navigation.navigate("PostPage", { postId: item._id })} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>VIEW POST</Text>
      </TouchableOpacity>
    </View>
  );
};


  return (
    <View style={styles.container}>
      {post.length === 0 ? (
        <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="blue" />
  </View>
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
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: 10,
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
    color:'blue',
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
    marginTop:10,
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

export default ProfPostForeign;
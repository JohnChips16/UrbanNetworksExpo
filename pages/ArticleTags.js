import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';


const TagArticle = () => {
  const navigation = useNavigation();
const route = useRoute();
  const { articleTag } = route.params;

  const [article, setArticle] = useState([])
  const [articleLoc, setArticleLoc] = useState([])
  const [articleFeed, setArticleFeed] = useState([])
  
  

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
  
  
  
   const fetchAllNews = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://localhost:9000/v1/users/school/news/hashtag/${articleTag}/`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData.posts || [];
      setArticle(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  
   const fetchFeedNews = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch("http://localhost:9000/v1/users/school/news/feed/0", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData.data || [];
      setArticleFeed(data);
    } catch (err) {
      console.error(err.message);
    }
  };

const fetchAllNewsLoc = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch("http://localhost:9000/v1/users/school/news/q/matchby/loc", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData.data || [];
      setArticleLoc(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    fetchAllNews();
    
  }, []);
  

const renderItem = ({ item }) => {
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
       null
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
      <Text style={{fontWeight:'bold', fontSize:16, marginTop:10}}>{item.title}</Text>
      {renderCaption()}
      {item.attachment && (
        <Image
          source={{ uri: item.attachment }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <Text style={styles.authorUsername}>Posted {renderRelativeDate(item.datePosted)}</Text>
      {renderHashtags()}
      <View style={{ padding: 0.5, backgroundColor: '#eee' }}></View>
       <TouchableOpacity onPress={() => navigation.navigate("ArticlePage", { articleId: item._id })} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>VIEW ARTICLE</Text>
      </TouchableOpacity>
    </View>
  );
};

  
  return (
 <View style={styles.container}>
      <ScrollView>
      {article.length === 0 ? (
        null
      ) : (
        <FlatList
          data={article}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
     </ScrollView>
    </View>
    )
}



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
    height: 350,
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
  },
  skillReq: {
    marginBottom: 10,
    color:'#777'
  },
  employeeInfo: {
    marginBottom: 10,
  },
  applyButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth:1,
    borderColor:'#ddd',
    marginTop:10
  },
  applyButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});


export default TagArticle;
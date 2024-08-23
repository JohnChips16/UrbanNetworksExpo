import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, FlatList, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import FeedArticle from './FeedArticle'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ModalComponent from './ReplyModal'
import { Entypo } from '@expo/vector-icons';
const JobPage = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState({});
  const [comment, setComment] = useState([]);
  const [reply, setCommentReply] = useState([]);
  const [commentBody, setCommentBody] = useState('');
  const [showReplies, setShowReplies] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const openModal = (commentId) => {
    setSelectedCommentId(commentId);
    setModalVisible(true);
  };

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

    return (
      secondsDifference < minute ? 'just now' :
      secondsDifference < hour ? `${Math.floor(secondsDifference / minute)} ${Math.floor(secondsDifference / minute) === 1 ? 'minute' : 'minutes'} ago` :
      secondsDifference < day ? `${Math.floor(secondsDifference / hour)} ${Math.floor(secondsDifference / hour) === 1 ? 'hour' : 'hours'} ago` :
      secondsDifference < month ? `${Math.floor(secondsDifference / day)} ${Math.floor(secondsDifference / day) === 1 ? 'day' : 'days'} ago` :
      secondsDifference < year ? `${Math.floor(secondsDifference / month)} ${Math.floor(secondsDifference / month) === 1 ? 'month' : 'months'} ago` :
      `${Math.floor(secondsDifference / year)} ${Math.floor(secondsDifference / year) === 1 ? 'year' : 'years'} ago`
    );
  };
const fetchComment = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(`http://localhost:9000/v1/users/parrent/${postId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const responseData = await res.json();
        setComment(responseData || []);
      } catch (err) {
        console.error(err.message);
      }
    };
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(`http://localhost:9000/v1/users/school/job/${postId}`, {
          method: "GET",
        });
        const responseData = await res.json();
        const data = responseData || {}; // Ensure data is an object
        setPost(data);
        console.log(data)
      } catch (err) {
        console.error(err.message);
      }
    };

    

    const fetchReply = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(`http://localhost:9000/v1/users/replies/${comment._id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const responseData = await res.json();
        setCommentReply(responseData || []);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchPost();
    
  }, []);

  const renderJobItemLinked = ({ item }) => {
     return (
      <View style={styles.jobItem}>
          <Text style={{ marginTop: 0, alignSelf: 'flex-start', marginLeft:0, paddingBottom:10 }}>Suggested jobs</Text>
               
    <View style={{padding:0.5, backgroundColor:'#eee',}}></View>
    
        <Text style={styles.title}>{item.title ? item.title : 'No data'}</Text>
               <Text style={styles.datePosted}>{renderRelativeDate(item.datePosted)}</Text>
        <View style={styles.authorInfo}>
        <Text>Offered by </Text>
          <Text style={styles.authorName}>{item.author?.schoolOrUniversityName}</Text>
          <Text style={styles.authorUsername}>{item.author?.username}</Text>
           <Text>{item.location ? item.location : ''}</Text>
           
        </View>
        
              <Text style={{fontWeight:'bold'}}>Job requirement : {item.jobReq ? item.jobReq : ''}</Text>
              <Text style={{fontWeight:'bold'}}>Job type : {item.typeofJob ? item.typeofJob : ''}</Text>
              <Text style={{fontWeight:'bold'}}>Employees : {item.numEmployee ? item.numEmployee : ''}</Text>
                 <Text style={styles.skillReq}>Skills required: {item.skillReq ? item.skillReq.join(', ') : 'No data'}</Text>
           <Text style={{paddingBottom:10}}>Compare your profile</Text>
  
    <View style={{padding:0.5, backgroundColor:'#eee'}}></View>
        <Text style={styles.hashtags}>{item.hashtags ? item.hashtags : 'No data'}</Text>

              <Text style={styles.description}> {item.caption ? item.caption : 'No data'}</Text>
              <Text style={styles.description}>Description about the job : {item.aboutJob ? item.aboutJob : 'No data'}</Text>
        
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>APPLY JOB</Text>
        </TouchableOpacity>
     
      </View>
    );
  };


const RenderCommentItem = ({ item, item2, openModal }) => {
  return (
    <View style={styles.commentItem}>
      <Image
        source={{ uri: item.author.avatarPic }}
        style={styles.avatar}
        resizeMode="cover"
      />
      <View style={styles.commentContent}>
        <TouchableOpacity onPress={() => openModal(item._id)}> 
          <View style={styles.commentBubble}>
            <Text style={styles.commentAuthor}>{item.author.fullname}</Text>
            <Text style={styles.commentText}>{item.message}</Text>
            <Text style={styles.commentDate}>Posted {renderRelativeDate(item.date)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const handleCommentSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://localhost:9000/v1/users/comment/${postId}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ message: commentBody })
      });

      if (!res.ok) {
        throw new Error('Failed to submit comment');
      }

      // Refresh comments after successful submission
      fetchComment();
      setCommentBody('');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
    <ScrollView>
      {Object.keys(post).length === 0 ? (
        <View>
          <Text style={{ marginTop: 70 }}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={[post]} 
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderJobItemLinked({ item })}
        />
      )}
    
 
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentInputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    
    borderTopColor: '#ccc',
  },
  commentInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor:'#eee'
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
    borderRadius: 7
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
    fontSize: 25,
    fontWeight: 'normal',
    marginBottom: 10,
    marginTop: 5
  },
  authorInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  authorName: {
    fontWeight: 'bold',
    marginRight: 5,
    color: 'black',
  },
  authorUsername: {
    marginRight: 5,
    color: '#777',
    paddingBottom: 7,
    paddingTop: 0
  },
  datePosted: {
    color: '#777',
    paddingBottom:10
  },
  description: {
    marginBottom: 10,
    marginTop: 10
  },
  description0: {
    marginBottom: 10,
    color: '#777',
  },
  hashtags: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'blue',
    marginTop:10
  },
  skillReq: {
    marginBottom: 10,
    color: '#777'
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
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 10
  },
  applyButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
    marginLeft: 15
  },
  commentContent: {
    flex: 1,
  },
  commentBubble: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    maxWidth: '90%', // Adjust as needed
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  commentText: {
    marginBottom: 2,
    // Ensure comment text wraps within its container
    flexWrap: 'wrap',
  },
  commentDate: {
    color: 'gray',
    fontSize: 12,
  },
  replyBubble: {
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  replyAuthor: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  replyText: {
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  replyDate: {
    color: 'gray',
    fontSize: 12,
  },
});

export default JobPage;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, FlatList, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';



const JobTags = () => {
  const navigation = useNavigation();
const route = useRoute();
  const { JobTag } = route.params;

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
  const [jobs, setJobs] = useState([]);
  const [count, setCount] = useState("");
  const [jobsFeed, setJobsFeed] = useState([]);
  const [jobsloc, setJobsloc] = useState([]);
  const [jobsskill, setJobskill] = useState([]);
  const [jobscred, setJobscred] = useState({});
  const [Linkedin, setJobsLinkedin] = useState([])
  const [LinkedinSkill, setLinkedinSkill] = useState([])
  const fetchAllJobs = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://localhost:9000/v1/users/school/job/hashtag/${JobTag}/`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData.posts || [];
      setJobs(data);
      setCount(responseData.count)
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const fetchFeedJobs = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch("http://localhost:9000/v1/users/school/job/feed/0", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData || [];
      setJobsFeed(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  
  const fetchLocobs = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch("http://localhost:9000/v1/users/school/job/q/matchby/loc", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData.data || [];
      setJobsloc(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const fetchSkilljobs = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch("http://localhost:9000/v1/users/school/job/q/matchby/skills", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData.data || [];
      setJobskill(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const fetchJobscred = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch("http://localhost:9000/v1/users/school/job/matchby/this/cred", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData._matchedJobs.job || {};
      setJobscred(data);
    } catch (err) {
      console.error(err.message);
    }
  };

const fetchJobsLinkedin = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch("http://localhost:9000/v1/users/linkedin/jobs?q=&l=&dtp=&jtp=&rmtf=&slry=&exprl=&limit=", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData || [];
      setJobsLinkedin(data);
    } catch (err) {
      console.error(err.message);
    }
  };

const fetchJobsLinkedinSkill = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch("http://localhost:9000/v1/users/linkedin/jobs/alg/skillpointed/default_q", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData || [];
      setLinkedinSkill(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchAllJobs();
    
  }, []);

  const handleApply = (urlApply) => {
    Linking.openURL(urlApply);
  };

  const renderJobItem = ({ item }) => {
    return (
      <View style={styles.jobItem}>
          <Text style={{ marginTop: 0, alignSelf: 'flex-start', marginLeft:0, paddingBottom:10 }}>Suggested jobs</Text>
               
    <View style={{padding:0.5, backgroundColor:'#eee',}}></View>
    
        <Text style={styles.title}>{item.title ? item.title : 'No data'}</Text>
               <Text style={{paddingBottom:10, color:'#777'}}>{renderRelativeDate(item.datePosted)}</Text>
        <View style={styles.authorInfo}>
        <Text>Offered by </Text>
          <Text style={styles.authorName}>{item.author?.schoolOrUniversityName}</Text>
          <Text style={styles.authorUsername}>{item.author?.username}</Text>

        </View>
                   <Text style={{paddingBottom:10}}>{item.location ? item.location : ''}, {item.typeofJob ? item.typeofJob : ''}</Text>
           
      
        
           
  
    <View style={{padding:0.5, backgroundColor:'#eee'}}></View>
        <Text style={styles.hashtags}>{item.hashtags ? item.hashtags : 'No data'}</Text>

      <TouchableOpacity onPress={() => navigation.navigate("JobPage", { postId: item._id })} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>VIEW JOB</Text>
      </TouchableOpacity>
     
      </View>
    );
  };

const renderJobItemLinked = ({ item }) => {
  return (
    <View style={styles.jobItem}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
       <Ionicons name="logo-linkedin" size={30} color="blue" style={{ marginRight: 10, marginBottom:10 }} />
        <Text style={{ marginTop: 5, alignSelf: 'flex-start', marginLeft: 0, paddingBottom: 10 }}>Suggested jobs from LinkedIn</Text>
      </View>
      <View style={{ padding: 0.5, backgroundColor: '#eee' }}></View>
      <Text style={styles.title}>{item.position ? item.position : 'No data'}</Text>
      <View style={styles.authorInfo}>
        <Text style={styles.authorName}>{item.company}</Text>
      </View>
      <Text style={styles.description}>Job offered by {item.company ? item.company : 'No data'}</Text>
      <Text style={styles.authorUsername}>Posted {item.agoTime}</Text>
      <View style={{ padding: 0.5, backgroundColor: '#eee' }}></View>
      <TouchableOpacity onPress={() => handleApply(item.jobUrl)} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

  return (
    <View style={styles.container}>
    <Text style={{padding:10, marginLeft:15}}>found {count} jobs</Text>
    <ScrollView>
      {jobs.length === 0 ? (
     null
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderJobItem}
        />
      )}
       </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
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
    color:'#777'
  },
  authorUsername: {
    marginRight: 5,
    color:'#777'
  },
  datePosted: {
    color: '#777',
  },
  description: {
    marginBottom: 10,
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
    backgroundColor: '#3b5998',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default JobTags;
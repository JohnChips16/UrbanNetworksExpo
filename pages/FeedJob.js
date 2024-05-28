import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
const FeedJob = () => {
  const [jobs, setJobs] = useState([]);
  const [jobsloc, setJobsloc] = useState([]);
  const [jobsskill, setJobskill] = useState([]);
  const [jobscred, setJobscred] = useState({});
  const [Linkedin, setJobsLinkedin] = useState([])
  const [LinkedinSkill, setLinkedinSkill] = useState([])
  const fetchAllJobs = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch("http://localhost:9000/v1/users/school/job/fetch/all", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = await res.json();
      const data = responseData.data || [];
      setJobs(data);
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
    fetchLocobs()
    fetchSkilljobs()
    fetchJobsLinkedinSkill()
    fetchJobsLinkedin()
    fetchJobscred()
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
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{item.author?.schoolOrUniversityName}</Text>
          <Text style={styles.authorUsername}>@{item.author?.username}</Text>
  
        </View>
                <Text style={styles.datePosted}>{item.datePosted}</Text>
        <Text style={styles.description}>{item.caption ? item.caption : 'No data'}</Text>
    <View style={{padding:0.5, backgroundColor:'#eee'}}></View>
        <Text style={styles.hashtags}>{item.hashtags ? item.hashtags : 'No data'}</Text>
        <Text style={styles.skillReq}>Skills required: {item.skillReq ? item.skillReq.join(', ') : 'No data'}</Text>
        <Text style={styles.employeeInfo}>{item.numEmployee} employee(s)</Text>
        <TouchableOpacity onPress={() => handleApply(item.urlApply)} style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply</Text>
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
      {jobs.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderJobItem}
        />
      )}
       {jobsloc.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={jobsloc}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderJobItem}
        />
      )}
       {jobsskill.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={jobsskill}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderJobItem}
        />
      )}
       {jobscred.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={jobscred}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderJobItem}
        />
      )}
       {Linkedin.length === 0 ? (
        <Text style={{alignText:'center'}}>Data not available</Text>
      ) : (
        <FlatList
          data={Linkedin}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderJobItemLinked}
        />
      )}
       {LinkedinSkill.length === 0 ? (
        <Text>Data not available</Text>
      ) : (
        <FlatList
          data={LinkedinSkill}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderJobItemLinked}
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
    color:'blue'
  },
  authorUsername: {
    marginRight: 5,
    color:'blue'
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
    backgroundColor: 'blue',
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

export default FeedJob;
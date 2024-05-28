import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const FeedNews = () => {
  const [cnn, setCnn] = useState([])
  
  
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
  
  
  
  const fetchcnn = async () => {
    try {
      const res = await fetch("http://localhost:5000/cnn/ekonomi", {
        method: "GET"
      });
      const responseData = await res.json();
      const data = responseData.data.posts || [];
      setCnn(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  useEffect(() => {
    fetchcnn();
  }, []);
  
  
  const renderItem = ({ item }) => {
    const renderCaption = () => {
    if (item.thumbnail) {
      return (
        <Text style={[styles.description, { marginBottom: 10 }]}>{item.description ? item.description : 'No data'}</Text>
      );
    } else {
      // Calculate font size dynamically based on caption length
      let fontSize = 18;
      if (item.description && item.description.length > 50) {
        fontSize = 14;
      }
      return (
        <Text style={[styles.description, { marginBottom: 10, fontSize: fontSize }]}>{item.description ? item.description : 'No data'}</Text>
      );
    }
  };
  return (
    <View style={styles.jobItem}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Conditional rendering for author's avatar */}
    <MaterialCommunityIcons name="newspaper-variant" size={30} color="blue" style={{ marginRight: 10, marginBottom: 10 }}   />
        
        <View style={{display:'flex', flexDirection:'column'}}>
          <Text style={{ marginBottom: 10, alignSelf: 'flex-start', marginLeft: 0, paddingBottom: 2, fontWeight: 'bold', borderLeftWidth:1, paddingLeft:10, borderColor:'#ddd' }}>
          CNN
</Text>
           
        </View>
         <Text style={styles.authorUsername}>{renderRelativeDate(item.pubDate)}</Text>
      </View>
     
      <View style={{ padding: 0.5, backgroundColor: '#eee' }}></View>
      <Text style={{fontSize:16, fontWeight:'bold', marginTop:10}}>{item.title}</Text>
     {renderCaption()}
      {item.thumbnail && (
       <Image
  source={{ uri: item.thumbnail }}
  style={styles.image}
  resizeMode="cover"
/>
      )}
   
     
      <View style={{ padding: 0.5, backgroundColor: '#eee' }}></View>
      <TouchableOpacity onPress={() => handleApply(item.link)} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>view news</Text>
      </TouchableOpacity>
    </View>
  );
};

  
  return (
    <View style={styles.container}>
      {cnn.length === 0 ? (
        <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="blue" />
  </View>
      ) : (
        <FlatList
          data={cnn}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
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
    height: 150,
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
    marginLeft: 5,
    color:'blue',
    marginBottom:13,
    
    textAlign:'center'
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

export default FeedNews;
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, TouchableOpacity, ScrollView, Image, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const Search = () => {
  const [query, setQuery] = useState('');
  const [option, setOption] = useState('');
  const [response, setResponse] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
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
  
  

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:9000/v1/users/www/search/?option=${option}&query=${query}`);
      const data = await res.json();
      setResponse(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const options = ['People', 'post']; // Add more options here if needed

  const renderOptionItem = (opt) => (
    <TouchableOpacity key={opt} onPress={() => { 
        setOption(opt.toLowerCase()); 
        setModalVisible(false); 
      }}>
      <Text style={{ paddingVertical: 10, paddingHorizontal: 20 }}>{opt}</Text>
    </TouchableOpacity>
  );
  
  
  const renderlte2m = ({ item }) => (
  <View style={{ marginVertical: 10, backgroundColor: 'white', padding: 5, borderRadius: 5, flexDirection: 'row' }}>
      <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Profiler', { profileparam: item.user.username })}
    >
    {item.user.avatarPic && (
      <Image
        source={{ uri: item.user.avatarPic }}
        style={{ width: 50, height: 50, marginRight: 10, marginTop: 5 }}
      />
    )}
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item.user.fullname}</Text>
      <Text style={{ color: '#bbb' }} numberOfLines={1}>{item.user.username}</Text>
      <Text numberOfLines={2}>{item.user.about}</Text>
    </View>
    </TouchableOpacity>
  </View>
);



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


  const renderJobItems = ({ item }) => {
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
  
  
  
const renderItemArticle = ({ item }) => {
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
      <TouchableOpacity onPress={() => handleApply(item.url)} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>view article</Text>
      </TouchableOpacity>
    </View>
  );
};


const renderJobItemEvents = ({ item }) => {
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
      <Text style={{fontSize:18, fontWeight:'bold', marginTop:10}}>{item.title}</Text>
      {renderCaption()}
        <Text style={styles.authorUsername}>
        {item.eventDate}</Text>
        <Text style={styles.authorUsername}>
       at {item.eventHour}</Text>
          <Text style={styles.authorUsername}>
        at {item.locationOrPlatform}</Text>
      {item.attachment && (
        <Image
          source={{ uri: item.attachment }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      
      {renderHashtags()}
      <View style={{ padding: 0.5, backgroundColor: '#eee' }}></View>
      <TouchableOpacity onPress={() => handleApply(item.url)} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>view event</Text>
      </TouchableOpacity>
    </View>
  );
};



  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 20, zIndex: 1 }}>
        <TextInput
          style={{ marginBottom: 10, padding: 10, borderColor: '#ccc', borderWidth: 1, backgroundColor:'#fff' }}
          placeholder="Enter search query..."
          value={query}
          onChangeText={text => setQuery(text)}
        />
        <Button title={option || 'Select Option'} color="#262626" onPress={() => setModalVisible(true)} />
        <View style={{marginTop:5}}>
        <Button titleStyle={{
     color: '#00BAD4',
     fontSize: 30,
     fontStyle: 'italic',
  }} title="Search" color="#262626" onPress={handleSearch} />
  </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
            {options.map(renderOptionItem)}
          </View>
        </View>
      </Modal>

      <ScrollView style={{ flex: 1, marginTop: 180 }}>
        {response && response.queryoption === 'people' && (
          <FlatList
            data={response.data}
            renderItem={renderlte2m}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
    {response && response.option === 'post' && (
  <FlatList
    data={response.data.posts} // Pass the entire array of posts
    renderItem={({ item }) => renderJobItemLinked({ item, navigation })}
    keyExtractor={(item, index) => index.toString()}
  />
)}
    {response && response.option === 'post' && (
  <FlatList
    data={response.data.jobs} // Pass the entire array of posts
    renderItem={({ item }) => renderJobItems({ item })}
    keyExtractor={(item, index) => index.toString()}
  />
)}
{response && response.option === 'post' && (
  <FlatList
    data={response.data.news} // Pass the entire array of posts
    renderItem={({ item }) => renderItemArticle({ item })}
    keyExtractor={(item, index) => index.toString()}
  />
)}
{response && response.option === 'post' && (
  <FlatList
    data={response.data.events} // Pass the entire array of posts
    renderItem={({ item }) => renderJobItemEvents({ item })}
    keyExtractor={(item, index) => index.toString()}
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


export default Search;
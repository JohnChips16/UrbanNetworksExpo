import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';

const HorizontalCarouselWithItems = ({ data }) => {
  if (!data || data.length === 0) {
    // If no data exists, return null
    return null;
  }

  const renderCarouselItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        {/* Render image if attachment exists */}
        {item.attachment ? (
          <Image source={{ uri: item.attachment }} style={styles.image} />
        ) : (
          <View style={styles.avatarContainer}>
            
          </View>
        )}
        {/* Render caption */}
        <Text style={[styles.caption, item.attachment ? styles.topCaption : styles.bottomCaption]}>{item.caption}</Text>
      </View>
    );
  };

  return (
    <View>
    <Text style={{marginTop:0, marginLeft:0, fontWeight:'bold', fontSize:16, backgroundColor:'#eee', padding:7, borderBottomWidth:0.5, borderColor:'#777'}}>Featured post</Text>
    <Carousel
      data={data}
      renderItem={renderCarouselItem}
      sliderWidth={400} // Adjusted slider width
      sliderHeight={400} // Added slider height
      itemWidth={300} // Adjusted item width
      layout={'default'}
      loop
      itemHorizontalMargin={10} // Added space between items
    />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd', // Changed border color to a lighter shade
    borderRadius: 10, // Added border radius for a rounded appearance
    backgroundColor: '#fff', // Added background color for a cleaner look
    padding: 10,
    width: 300, // Adjusted item width
    height: 400, // Adjusted item height
    paddingTop: 20, // Added padding to the top
    paddingBottom: 20, // Added padding to the bottom
    marginTop:20
  },
  image: {
    width: '100%', // Adjusted image width to fit container
    height: '80%', // Adjusted image height to fit container
    borderRadius: 0, // Added border radius for a rounded appearance
    
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Adjusted avatar container width to fit container
    height: '100%', // Adjusted avatar container height to fit container
    borderRadius: 10, // Added border radius for a rounded appearance
    backgroundColor: '#fff', // Added background color for a cleaner look
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  caption: {
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 10, // Added padding horizontal
    color: '#333', // Changed text color to a darker shade
    fontWeight: 'bold', // Added font weight for emphasis
  },
  topCaption: {
    top: 20, 
    paddingBottom:10,
    borderBottomWidth:0.5,
    borderColor:'#eee'
  },
  bottomCaption: {
    textAlign:'center',
    
  },
});

export default HorizontalCarouselWithItems;
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FeedJob from './FeedJob';
import FeedPost from './FeedPost';
import FeedNews from './FeedNews'
import FeedArticle from './FeedArticle'
import EventFeed from './EventFeed'
import Network from './Social'
// Placeholder components for each tab
const All = () => (
  <ScrollView style={styles.scrollContainer}>
    <View style={styles.contentContainer}>
      <Text style={styles.text}>All Content</Text>
    </View>
  </ScrollView>
);

const Jobs = () => (
  <ScrollView style={styles.scrollContainer}>
    <FeedJob />
  </ScrollView>
);

const Posts = () => (
  <ScrollView style={styles.scrollContainer}>
    <FeedPost />
  </ScrollView>
);

const Events = () => (
   <ScrollView style={styles.scrollContainer}>
    <EventFeed />
  </ScrollView>
);

const News = () => (
  <ScrollView style={styles.scrollContainer}>
    <FeedNews />
  </ScrollView>
);

const Articles = () => (
  <ScrollView style={styles.scrollContainer}>
    <FeedArticle />
  </ScrollView>
);

const Networks = () => (
  <ScrollView style={styles.scrollContainer}>
    <Network />
  </ScrollView>
);

const initialLayout = { width: Dimensions.get('window').width };

const Catch = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([

    { key: 'jobs', title: 'Jobs' },
    { key: 'posts', title: 'Posts' },
    { key: 'events', title: 'Events' },
    { key: 'news', title: 'News' },
    { key: 'articles', title: 'Articles' },
    { key: 'networks', title: 'Networks' },
  ]);

  const renderScene = SceneMap({
 
    jobs: Jobs,
    posts: Posts,
    events: Events,
    news: News,
    articles: Articles,
    networks: Networks
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          scrollEnabled
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          labelStyle={styles.label}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  tabBar: {
    backgroundColor: '#eee',
  },
  indicator: {
    backgroundColor: '#3b5998',
  },
  label: {
    color: '#262626',
    fontWeight: 'bold',
  },
});

export default Catch;
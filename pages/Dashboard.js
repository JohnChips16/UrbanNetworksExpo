import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Pressable } from 'react-native';
import NewPost from './NewPost'
import { View, Text, TextInput } from 'react-native';
import ProfilerScreen from './profiler'
import Home from './Home';
import Search from './search'
import Profile from './Profile';
import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import EditProfile from './EditProfile';
import PostPage from './PostPage'
import Catch from './Catch'
import JobPage from './JobPage'
import PostTag from './PostTag'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import TagArticle from './ArticleTags'
import EventPage from './EventPage'
import ArticlePage from './ArticlePage' 
import JobTags from './JobTags'
import Inbox from './Inbox'
import InboxPage from './InboxPage'
import PostInbox from './PostInbox'
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DashboardWithTabs = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: 'red', // Customize tab bar background color
          },
        }}
        screenOptions={{ headerShown: false }} // Hide the header for all screens
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: '', // Set tabBarLabel to an empty string
            tabBarIcon: ({ color, size }) => (
                 <View style={{marginTop:10}}>
              <Ionicons name="home" size={size} color="#262626" />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Catch"
          component={CatchStack}
          options={{
            tabBarLabel: '', // Set tabBarLabel to an empty string
            tabBarIcon: ({ color, size }) => (
                 <View style={{marginTop:10}}>
        <FontAwesome name="feed" size={size} color="#262626"  />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Inbox"
          component={InboxStack}
          options={{
            tabBarLabel: '', // Set tabBarLabel to an empty string
            tabBarIcon: ({ color, size }) => (
                 <View style={{marginTop:10}}>
        <MaterialIcons name="email" size={size} color="#262626"  />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarLabel: '', // Set tabBarLabel to an empty string
            tabBarIcon: ({ color, size }) => (
            <View style={{marginTop:10}}>
              <Ionicons name="person" size={size} color="#262626" />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: '#262626',
            fontWeight: 'bold',
            fontSize: 22,
          },
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 0,}}>
              <Text style={{ fontWeight: 'bold', fontSize: 22, marginRight: 30 }}>Urban Networks</Text>
                <Pressable onPress={() => navigation.navigate('Search')}>
  <View style={{
    backgroundColor: '#eee', // Change this to your desired background color
    borderRadius: 27, // Half of the icon size to create a circle
    width: 40, // Same as borderRadius * 2
    height: 40, // Same as borderRadius * 2
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50 // Adjust the margin as needed
  }}>
    <Feather name="search" size={27} color="#262626" />
  </View>
</Pressable>
           <Pressable onPress={() => navigation.navigate('NewPost')}>
  <View style={{
    backgroundColor: '#eee', // Change this to your desired background color
    borderRadius: 27, // Half of the icon size to create a circle
    width: 40, // Same as borderRadius * 2
    height: 40, // Same as borderRadius * 2
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15 // Adjust the margin as needed
  }}>
    <Entypo name="feather" size={27} color="#262626" />
  </View>
</Pressable>
            </View>
          ),
        }}
      />
       <Stack.Screen
        name="NewPost"
        component={NewPost}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            color: 'black',
            fontWeight: 'normal',
            fontSize: 22,
          },
          headerTitle: 'New Post',
        }}
      />
       <Stack.Screen
        name="JobTags"
        component={JobTags}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            color: 'black',
            fontWeight: 'normal',
            fontSize: 22,
          },
          headerTitle: 'Job Tag',
        }}
      />
       <Stack.Screen
        name="TagArticle"
        component={TagArticle}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            color: 'black',
            fontWeight: 'normal',
            fontSize: 22,
          },
          headerTitle: 'Tag Article',
        }}
      />
     
       <Stack.Screen
        name="ArticlePage"
        component={ArticlePage}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            color: 'black',
            fontWeight: 'normal',
            fontSize: 22,
          },
          headerTitle: 'Article',
        }}
      />
       <Stack.Screen
        name="PostTag"
        component={PostTag}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            color: 'black',
            fontWeight: 'normal',
            fontSize: 22,
          },
          headerTitle: 'Tag',
        }}
      />
      <Stack.Screen
  name="PostPage"
  component={PostPage}
  options={{
    headerShown: true,
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 1,
    },
    headerTitleStyle: {
      color: 'black',
      fontWeight: 'normal',
      fontSize: 22,
    },
    headerTitle: 'Post', // Customize the header title
  }}
/>
      <Stack.Screen
  name="JobPage"
  component={JobPage}
  options={{
    headerShown: true,
    headerStyle: {
      backgroundColor: '#eee',
      borderBottomWidth: 1,
    },
    headerTitleStyle: {
      color: 'black',
      fontWeight: 'normal',
      fontSize: 22,
    },
    headerTitle: 'Job', // Customize the header title
  }}
/>
      <Stack.Screen
  name="EventPage"
  component={EventPage}
  options={{
    headerShown: true,
    headerStyle: {
      backgroundColor: '#eee',
      borderBottomWidth: 1,
    },
    headerTitleStyle: {
      color: 'black',
      fontWeight: 'normal',
      fontSize: 22,
    },
    headerTitle: 'Event', // Customize the header title
  }}
/>
 <Stack.Screen
  name="Search"
  component={Search}
  options={{
    headerShown: true,
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 1,
    },
    headerTitleStyle: {
      color: 'black',
      fontWeight: 'normal',
      fontSize: 22,
    },
    headerTitle: 'Search', // Customize the header title
  }}
/>
 <Stack.Screen
  name="Profiler"
  component={ProfilerScreen}
  options={{
    headerShown: true,
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 1,
    },
    headerTitleStyle: {
      color: 'black',
      fontWeight: 'normal',
      fontSize: 22,
    },
    headerTitle: 'Profile Page', // Customize the header title
  }}
/>
    </Stack.Navigator>
  );
};

const ProfileStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 0 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 22, marginRight: 30 }}>Profile</Text>
              <TextInput
                style={{ height: 40, borderColor: 'white', borderWidth: 0.5, paddingLeft: 10, width: '60%', backgroundColor: '#eee', borderRadius: 0 }}
                placeholder="Search..."
              />
              <Pressable onPress={() => navigation.navigate('EditProfile')}>
                <Feather name="edit" size={27} color="blue" style={{ marginLeft: 15 }} />
              </Pressable>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            color: 'black',
            fontWeight: 'normal',
            fontSize: 22,
          },
          headerTitle: 'Edit Profile',
        }}
      />
       <Stack.Screen
  name="PostPage1"
  component={PostPage}
  options={{
    headerShown: true,
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 1,
    },
    headerTitleStyle: {
      color: 'black',
      fontWeight: 'normal',
      fontSize: 22,
    },
    headerTitle: 'Post', // Customize the header title
  }}
/>
    </Stack.Navigator>
  );
};

const CatchStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Catch"
        component={Catch}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 0 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 22, marginRight: 30 }}>Catch </Text>
           
              
            </View>
          ),
        }}
      />
      
    </Stack.Navigator>
  );
};

const InboxStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Inbox"
        component={Inbox}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: '#262626',
            fontWeight: 'bold',
            fontSize: 22,
          },
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 0,}}>
              <Text style={{ fontWeight: 'bold', fontSize: 22, marginRight: 30 }}>Inbox</Text>
                <Pressable onPress={() => navigation.navigate('Search')}>
  <View style={{
    backgroundColor: '#fff', // Change this to your desired background color
    borderRadius: 27, // Half of the icon size to create a circle
    width: 40, // Same as borderRadius * 2
    height: 40, // Same as borderRadius * 2
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 150 // Adjust the margin as needed
  }}>
    <Feather name="search" size={27} color="#fff" />
  </View>
</Pressable>
           <Pressable onPress={() => navigation.navigate('PostInbox')}>
  <View style={{
    backgroundColor: '#fff', // Change this to your desired background color
    borderRadius: 27, // Half of the icon size to create a circle
    width: 40, // Same as borderRadius * 2
    height: 40, // Same as borderRadius * 2
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15 // Adjust the margin as needed
  }}>
    <Entypo name="feather" size={27} color="#262626" />
  </View>
</Pressable>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="InboxPage"
        component={InboxPage}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            color: 'black',
            fontWeight: 'normal',
            fontSize: 22,
          },
          headerTitle: 'Inbox',
        }}
      />
      <Stack.Screen
        name="PostInbox"
        component={PostInbox}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            color: 'black',
            fontWeight: 'normal',
            fontSize: 22,
          },
          headerTitle: 'Write',
        }}
      />
    </Stack.Navigator>
  );
};


export default DashboardWithTabs;
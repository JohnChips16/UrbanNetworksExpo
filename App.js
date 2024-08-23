import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from './pages/Login';
import DashboardWithTabs from './pages/Dashboard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostPage from './pages/PostPage'
export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch("http://localhost:9000/v1/urb/verify", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    checkAuthenticated();
  }, []);

  const setAuth = boolean => {
    setIsAuth(boolean);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuth ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Login', headerTitleAlign: 'center' }}
            initialParams={{ setAuth: setAuth }}
          />
        ) : (
       
          <Stack.Screen
            name='Dashboard'
            component={DashboardWithTabs}
            options={{ 
            headerShown:false,
            title: 'URBANNETWORKS', headerTitleAlign: 'center', headerStyle:{
              borderBottomWidth:1,
              borderBottomColor:'grey',
              backgroundColor:"#fff"
            },
            headerTitleStyle:{
              color:'#262626',
              fontWeight:'bold'
            }}}
          />
       
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'yellow',
    fontWeight: '700',
    fontSize: 25,
  }
});

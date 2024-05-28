import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation, route }) => {
  const { setAuth } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitForm = async () => {
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:9000/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();

      if (parseRes.tokens.access.token) {
        await AsyncStorage.setItem("token", parseRes.tokens.access.token);
        setAuth(true);
        navigation.navigate('Dashboard');
      } else {
        setAuth(false);
        alert(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>URBAN NETWORKS</Text>
      <View style={styles.textboxContainer}>
        <Text style={styles.textbox}>Login or sign up to see the communities and jobs.</Text>
      </View>
      <TextInput
        style={styles.inputField}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.submitButton} onPress={onSubmitForm}>
        <Text style={styles.submitButtonText}>Log in</Text>
      </TouchableOpacity>
      <Text style={styles.textbox1}>OR</Text>
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton1} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerButtonText1}>Forgot Password</Text>
      </TouchableOpacity>
      <View style={styles.textboxContainer2}>
        <Text style={styles.textbox1}>©2024 Urban Networks. all rights reserved. Established in Bandung, West Java 40252, Indonesia.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#262626'
  },
  textboxContainer: {
    marginBottom: 20,
  },
  textboxContainer2: {
    marginTop: 90,
    borderWidth:1,
    borderTop:'0.5px solid lightgrey',
    width:'100%',
    padding:25,
    borderColor:'lightgrey',
    backgroundColor:'#f9f9f9'
  },
  textbox: {
    textAlign: 'center',
    color:'darkgrey'
  },
  textbox1: {
    textAlign: 'center',
    color:'#262626',
    
  },
  inputField: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor:'rgb(244,244,244)'
  },
  submitButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#4f4ff5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'lightgrey',
    marginTop:30,
    borderWidth: 1, // Add this property
},
  registerButton1: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'lightgrey',
    marginTop:10,
    borderWidth: 1, // Add this property
},
  registerButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButtonText1: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
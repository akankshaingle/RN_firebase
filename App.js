import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Text, TextInput, StyleSheet, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInscreen from './screens/SignInscreen';
import HomeScreen, { ShowHomeScreenOption } from './screens/HomeScreen';
// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import apiKeys from './config/Keys';


// const app = apiKeys.firebase.initializeApp(firebaseConfig);
// export const db = app.database();

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: true,
      isAuthenticationReady: false,
      isAuthenticated: false
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(apiKeys.firebaseConfig);
      firebase.auth().onAuthStateChanged((user) => {
        this.setState({ isAuthenticationReady: true })
        this.setState({ isAuthenticated: !!user })
      })
    }
  }
  render() {

    return (
      <NavigationContainer>
        <Stack.Navigator>
          {
            (this.state.isAuthenticated) ? <Stack.Screen name="Home" component={HomeScreen} /> : <Stack.Screen name="SignIn" component={SignInscreen} />
          }
          <Stack.Screen
            options={ShowHomeScreenOption}
            name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}
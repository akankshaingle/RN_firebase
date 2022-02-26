import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInscreen from './screens/SignInscreen';
import HomeScreen, { ShowHomeScreenOption } from './screens/HomeScreen';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import apiKeys from './config/Keys';

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
    // firebase.auth().onAuthStateChanged((user) => {
    //   console.log(user.uid);
    // })
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* {
            (this.state.isAuthenticated) ? <Stack.Screen options={ShowHomeScreenOption} name="Home" component={HomeScreen} /> : <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignInscreen} />
          } */}
          <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignInscreen} />
          <Stack.Screen options={ShowHomeScreenOption} name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}
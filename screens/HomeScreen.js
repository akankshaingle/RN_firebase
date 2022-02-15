import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Foundation } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
require('firebase/database');
// import firebase from 'firebase';
import { firebaseConfig } from '../config/Keys'

const getData = () => {
    firebase.database().ref(`/ContactList/`).on('value', snapshot => {
        let responselist = Object.values(snapshot.val())
        console.log(snapshot.val())
        console.log(responselist)
    });
}
const HomeScreen = () => {
    useEffect(() => {
        getData();
    });
    return (
        <View>
            <Text>Homescreen</Text>
            {/* <Text>{names}</Text> */}
        </View>
    )


}

export function ShowHomeScreenOption({ route, navigation }) {
    const logOut = () => {
        firebase.auth().signOut()
            .then(() => {
                alert("logged Out")
                navigation.navigate('SignIn')
            })
    }
    return {
        headerTitle: 'Blogs',
        headerRight: () => (
            <TouchableOpacity onPress={() => logOut()}>
                <Foundation name="pencil" size={30} color="black" />
            </TouchableOpacity>

        ),
    }
}

const styles = StyleSheet.create({})
export default HomeScreen
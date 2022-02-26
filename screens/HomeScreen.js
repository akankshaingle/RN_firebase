import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app';
require('firebase/compat/database');
// import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = () => {
    const [press, setPress] = useState(false)
    const [data, setdata] = useState('')
    // firebase.auth().onAuthStateChanged((user) => {
    //     console.warn(user.uid);
    // })
    const getData = () => {
        firebase.database().ref(`UserList/`).on('value', snapshot => {
            var responselist = Object.values(snapshot.val())
            setdata(responselist)
            setPress(true)
        });
    }
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={getData} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }} >
                <MaterialCommunityIcons name="sync-circle" size={40} color="black" />
            </TouchableOpacity>
            {press == true ?
                <FlatList
                    keyExtractor={(item, index) => 'key' + index}
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <Text style={{
                                margin: 15,
                                padding: 10,
                                backgroundColor: '#cccccc',
                                borderWidth: 1,
                                fontSize: 18

                            }}>{item.name}{'\n'}{item.number}
                            </Text>
                        )
                    }} />
                : <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>Data not available click on the above button to fetch data.</Text>}
        </View>
    )
}

export function ShowHomeScreenOption({ route, navigation }) {
    const logOut = () => {
        firebase.auth().signOut()
            .then(() => {
                navigation.navigate('SignIn')
                alert("logged Out")
            })
    }
    return {
        headerTitle: 'Contact List',
        headerRight: () => (
            <TouchableOpacity onPress={() => logOut()}>
                <AntDesign name="logout" size={30} color="black" />
            </TouchableOpacity>,
            <TouchableOpacity onPress={() => logOut()}>
                <AntDesign name="logout" size={30} color="black" />
            </TouchableOpacity>
        ),
    }
}

const styles = StyleSheet.create({})
export default HomeScreen
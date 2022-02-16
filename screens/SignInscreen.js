import React, { useState, useReducer, useEffect, Component } from 'react'
import { View, Text, TextInput, StyleSheet, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
// import * as firebase from 'firebase';

const initialState = { Email: '', Password: '' };

const reducer = (state, action) => {
    switch (action.changeValue) {
        case 'Email':
            return { ...state, Email: action.value }
        case 'Password':
            return { ...state, Password: action.value }
        default:
            return state;
    }
}

export function SignInscreen({ navigation }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    async function loginWithFacebook() {
        try {
            await Facebook.initializeAsync({
                appId: '7739544266071562',
            });

            const { type, token } =
                await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile'],
                });

            if (type === 'success') {
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                navigation.navigate('Home')
            } else {
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }
    const loginUser = (Email, Password) => {
        try {
            firebase.auth().signInWithEmailAndPassword(Email, Password).then(function (user) {
                console.log(user);
            })
        }
        catch (error) {
            console.warn(error.toString());
        }
    }

    const signUpUser = (Email, Password) => {
        try {
            if (!Password) {
                Alert.alert('Password is Required');
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(Email, Password)
        } catch (error) {
            console.warn(error.toString());
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 38 }}>
                <Text style={styles.header}>Sign In Now</Text>
            </View>

            <View style={styles.inputView}>
                <Ionicons name="person-circle" size={24} color={state.Email === '' ? '#c1bfbf' : 'dodgerblue'} style={styles.icon} />
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(Email) => {
                        dispatch({ changeValue: 'Email', value: Email })
                    }}
                />
            </View>

            <View style={styles.inputView}>
                <Entypo name="lock" size={24} color={state.Password === '' ? '#c1bfbf' : 'dodgerblue'} style={styles.icon} />
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(Password) =>
                        dispatch({ changeValue: 'Password', value: Password })}
                />
            </View>
            <TouchableOpacity
                onPress={() => loginWithFacebook()} style={styles.loginBtn}>
                <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Login With Facebook</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                onPress={() => signUpUser(state.Email, state.Password)} style={styles.loginBtn}>
                <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>SIGN UP</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
                // onPress={() => {
                //     if (!state.Email) {
                //         Alert.alert('Email is required');
                //     }
                //     else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.Email)) {
                //         Alert.alert("Invalid email address");
                //     }
                //     else if (!state.Password) {
                //         Alert.alert('Password is Required');
                //     }
                //     else {
                //         // navigation.navigate('Register')
                //         () => { loginUser(state.Email, state.Password) }
                //     }
                //     console.warn(state);
                // }
                // }
                // style={styles.loginBtn}
                onPress={() => loginUser(state.Email, state.Password)} style={styles.loginBtn}>
                <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>SIGN IN</Text>
            </TouchableOpacity> */}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        alignSelf: 'center',
        margin: 10,
        marginLeft: 25
    },
    header: {
        fontSize: 30,
        color: 'dodgerblue',
        fontWeight: '700',
        alignSelf: 'center',
    },

    inputView: {
        flexDirection: 'row',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 30,
        width: "80%",
        height: 50,
        marginBottom: 15,
        alignSelf: 'center',
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 80,
        backgroundColor: "dodgerblue",
    },

});
export default SignInscreen
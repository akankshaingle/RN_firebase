
export default {
    firebaseConfig: {
        apiKey: "AIzaSyCjn2aDkryveiq1IKDaDKvrOEhkVgGhv1Y",
        authDomain: "react-firebase-ceb04.firebaseapp.com",
        projectId: "react-firebase-ceb04",
        storageBucket: "react-firebase-ceb04.appspot.com",
        messagingSenderId: "38011390649",
        appId: "1:38011390649:web:a40ec88f2713e9a2906968",
        measurementId: "G-2606V7BZR4",
    }
}

// firebase.auth().onAuthStateChanged((user) => {
//     console.warn(user.uid);
//   })
//   const onReady = async () => {
//     firebase.auth().onAuthStateChanged((user) => {
//       console.warn(user.uid);
//       var id = user.uid;
//       if (id) {
//         navigationRef.reset({
//           index: 0,
//           routes: [{ name: 'Home' }],
//         });
//       }
//     })
//   }
const firebaseConfig = {
    apiKey: "AIzaSyBz0ha6pBkgM3XoUiTcddO9mKhcfDrKLkQ",
    authDomain: "habitree-d839f.firebaseapp.com",
    databaseURL: "https://habitree-d839f.firebaseio.com",
    projectId: "habitree-d839f",
    storageBucket: "habitree-d839f.appspot.com",
    messagingSenderId: "277221133014",
    appId: "1:277221133014:web:e20a1d351343a5cb605777",
    measurementId: "G-3H4S6G6G9H"
};
firebase.initializeApp(firebaseConfig);

firebase.database().ref('Andrew').set({
    x : 3
});

function addValues(userID, type, value) {
    firebase.database().ref(userID).once('value').then( snap => {
        let currentValue = snap.val().type;
        firebase.database().ref(userID).update({
            type : value+currentValue
        });
    });
}

addValues('Andrew', 'x', 4);

firebase.database().ref('').on('value', snap => {
    //update pictures
});




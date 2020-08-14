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

function addValues(userID, type, value) {
    firebase.database().ref(userID+'/'+type).once('value').then( snap => {
        let currentValue = snap.val();
        console.log("current value "+currentValue);
        var updates = {};
        updates[type] = value+currentValue;
        firebase.database().ref(userID).update(updates);
    });
}

firebase.database().ref('/').on('value', snap => {
    //update pictures
    console.log("Something was updated");
});




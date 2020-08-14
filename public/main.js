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

function completeGoal(userID, goalName) {
    var update = {};
    update['complete'] = true;
    firebase.database().ref('users/' + userID + '/goals/' + goalName).update(update);
};

function createGoal(userID, goalName, goalType) {
    firebase.database().ref('users/' + userID + '/goals/').set({
        'complete' : false,
        'type': goalType
    })
};

function changeEcosystemState(userID, stateName, value) {
    firebase.database().ref('users/' + userID + '/ecosystemState/' + stateName).once('value').then( snap => {
        let currentValue = snap.val();
        var updates = {};
        updates[stateName] = value+currentValue;
        firebase.database().ref('users/' + userID + '/ecosystemState').update(updates);
    });
};

function setLogonDate(userID, date) {
    var update = {};
    update['date'] = date;
    firebase.database().ref('users/' + userID + '/lastLogon/').update(update);
};

firebase.database().ref('/').on('value', snap => {
    //update pictures
    console.log("Something was updated");
});




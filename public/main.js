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
    update['/complete'] = true;
    firebase.database().ref('users/' + userID + '/goals/' + goalName).update(update);
};

function createGoal(userID, goalName, goalType) {
    firebase.database().ref('users/' + userID + '/goals/' + goalName).set({
        'complete' : false,
        'type': goalType
    });
};

/*function getGoals(userID) {
    firebase.database().ref('users/' + userID + '/goals/').once('value').then( snap => {
        
    });
}*/

function changeEcosystemState(userID, stateName, value) {
    firebase.database().ref('users/' + userID + '/ecosystemState/' + stateName).once('value').then( snap => {
        let currentValue = snap.val().value;
        var updates = {};
        updates[stateName] = value+currentValue;
        firebase.database().ref('users/' + userID + '/ecosystemState').update(updates);
    });
};

function createEcosystemState(userID, stateName, value) {
    firebase.database().ref('users/' + userID + '/ecosystemState/' + stateName).set({
        'value' : value
    });
}

//DOESN'T WORK
function getLogonDate(userID) {
    var ret;
    firebase.database().ref('users/' + userID).once('value').then(snap => {
        ret = snap.val().lastLogon;
        console.log("last logon (callback): " + ret);
    });
    console.log("last logon (main.js): " + ret);
    return ret;
};

function setLogonDate(userID, date) {
    var update = {};
    update['/lastLogon'] = date;
    firebase.database().ref('users/' + userID).update(update);
    console.log("set logon");
};

firebase.database().ref('/').on('value', snap => {
    //update pictures
    console.log("Something was updated");
});




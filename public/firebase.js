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

function changeGoal(userID, goalName, value) {
    var update = {};
    update['/complete'] = value;
    firebase.database().ref('users/' + userID + '/goals/' + goalName).update(update);
};

function createGoal(userID, goalName, goalType) {
    firebase.database().ref('users/' + userID + '/goals/' + goalName).set({
        'complete' : false,
        'type': goalType
    });
    let goalID = goalName.replace(/ /g, "-");
    let innerHTML = '<li class="list-group-item each-card" style="background-color: lightgray;">' + goalName + '<input id="' + goalID + '" class="ml-2" type="checkbox" style="float: right;" onchange="onChanged(this)"></li>';
    document.getElementById("goals").innerHTML += innerHTML;
};

function getGoals(userID) {
    return firebase.database().ref('users/' + userID + '/goals').once('value');
}

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

function getLogonDate(userID) {
    return firebase.database().ref('users/' + userID).once('value');
};

function setLogonDate(userID, date) {
    var update = {};
    update['/lastLogon'] = date;
    firebase.database().ref('users/' + userID).update(update);
};

firebase.database().ref('/').on('value', snap => {
    //update pictures
    console.log("Something was updated");
});

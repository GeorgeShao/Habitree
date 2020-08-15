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
    getGoals(uid).then(snap => {
        var innerHTML = "";
        let data = snap.val();
        for (var goal in data) {
          let goalID = goal.replace(/ /g, "-");
          innerHTML += '<li class="list-group-item each-card" style="background-color: lightgray;">' + goal + '<input id="' + goalID + '" class="ml-2" type="checkbox" style="float: right;" onchange="onChanged(this)"' + (data[goal].complete == true ? 'checked' : '') + '></li>';
        }
        document.getElementById("goals").innerHTML = innerHTML;
      });
};

function getGoals(userID) {
    return firebase.database().ref('users/' + userID + '/goals').once('value');
}

function getGoalType(userID, goalName) {
    return firebase.database().ref('users/' + userID + '/goals/' + goalName).once('value');
}

function changeEcosystemState(userID, stateName, value) {
    firebase.database().ref('users/' + userID + '/ecosystemState/' + stateName).once('value').then( snap => {
        let currentValue = snap.val().value;
        let updatedValue = Math.max(0, Math.min(10, value+currentValue));
        console.log(stateName + ": "+updatedValue);
        firebase.database().ref('users/' + userID + '/ecosystemState/' + stateName).set({
            'value' : updatedValue
        });
        loadImages(userID);
    });
};

function createEcosystemState(userID, stateName, value) {
    firebase.database().ref('users/' + userID + '/ecosystemState/' + stateName).set({
        'value' : value
    });
}

function getStateValue(userID, stateName) {
    return firebase.database().ref('users/' + userID + '/ecosystemState/' + stateName).once('value');
}

function getLogonDate(userID) {
    return firebase.database().ref('users/' + userID).once('value');
};

function setLogonDate(userID, date) {
    var update = {};
    update['/lastLogon'] = date;
    firebase.database().ref('users/' + userID).update(update);
};

function loadImages(uid) {
    getStateValue(uid, "clouds").then(snap => {
        let value = snap.val().value;
        let img = document.getElementById("clouds");
        if (value<4) {
            img.src = "images/clouds0.png";
        }else if (value<8) {
            img.src = "images/clouds1.png";
        }else {
            img.src = "images/clouds2.png";
        }
    });
    getStateValue(uid, "trees").then(snap => {
        let value = snap.val().value;
        let img = document.getElementById("trees");
        if (value<4) {
            img.src = "images/tree0.png";
        }else if (value<8) {
            img.src = "images/tree1.png";
        }else {
            img.src = "images/tree2.png";
        }
    });
    getStateValue(uid, "lake").then(snap => {
        let value = snap.val().value;
        let img = document.getElementById("pond");
        if (value<4) {
            img.src = "images/pond0.png";
        }else if (value<8) {
            img.src = "images/pond1.png";
        }else {
            img.src = "images/pond2.png";
        }
    });
}

firebase.database().ref('/').on('value', snap => {
    //update pictures
    console.log("Something was updated");
});

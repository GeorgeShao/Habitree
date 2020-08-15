function onChanged(obj) {
    console.log("Change");
    let goal = obj.id.replace(/-/g, " ");
    changeGoal(uid, goal, obj.checked);
    getGoalType(uid, goal).then(snap => {
        let type = snap.val().type;
        let val = (obj.checked == true ? 2 : -2);
        console.log("TYPE: " + type);
        if (type == "a") {
            changeEcosystemState(uid, "clouds", val);
        } else if (type == "l") {
            changeEcosystemState(uid, "trees", val);
        }else {
            changeEcosystemState(uid, "lake", val);
        }
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function addGoal() {
    let goal = document.getElementById("userGoal").value;
    document.getElementById("userGoal").value = "";
    let options = ["a", "l", "w"];
    createGoal(uid, goal, options[getRandomInt(3)]);
}
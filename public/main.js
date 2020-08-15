function onChanged(obj) {
    console.log("Change");
    changeGoal(uid, obj.id.replace(/-/g, " "), obj.checked);
}

function addGoal() {
    let goal = document.getElementById("userGoal").value;
    document.getElementById("userGoal").value = "";
    createGoal(uid, goal, "a");
}
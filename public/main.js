function onChanged(obj) {
    console.log("Change");
    changeGoal(uid, obj.id.replace(/-/g, " "), obj.checked);
}
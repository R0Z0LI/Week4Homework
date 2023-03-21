"use strict";
const addButton = document.getElementById("add-btn");
const weightDiv = document.getElementById("weight");
const dateDiv = document.getElementById("date");
let historyData = [];
//today's date
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", addWeight);
function addWeight() {
    const firstElem = {
        weight: +weightDiv.value,
        date: dateDiv.value,
    };
    historyData.push(firstElem);
    for (let i = 0; i < historyData.length; i++) {
        console.log(historyData[i].date);
    }
}

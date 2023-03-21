"use strict";
const addButton = document.getElementById("add-btn");
const weightDiv = document.getElementById("weight");
const dateDiv = document.getElementById("date");
const historyContainer = document.getElementById("history__container");
let historyData = [];
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", addWeight);
function addWeight() {
    deletePreviousElements();
    const firstElem = {
        weight: +weightDiv.value,
        date: dateDiv.value,
    };
    historyData.push(firstElem);
    sort();
    historyData.forEach((element) => {
        console.log(element);
    });
    let i = 0;
    historyData.forEach((element) => {
        const newDivElement = document.createElement("div");
        newDivElement.setAttribute("id", "history__row_" + i);
        historyContainer.appendChild(newDivElement);
        const newWeight = document.createElement("span");
        newWeight.innerHTML = element.weight.toString();
        const newDate = document.createElement("span");
        newDate.innerHTML = element.date;
        newDivElement.appendChild(newWeight);
        newDivElement.appendChild(newDate);
        i++;
    });
}
function sort() {
    for (let i = 0; i < historyData.length; i++) {
        for (let j = 0; j < historyData.length; j++) {
            if (historyData[i].date > historyData[j].date) {
                let tmp = historyData[i];
                historyData[i] = historyData[j];
                historyData[j] = tmp;
            }
        }
    }
}
function deletePreviousElements() {
    for (let i = 0; i < historyData.length; i++) {
        const history__container__firstDiv = document.getElementById("history__row_" + i);
        history__container__firstDiv === null || history__container__firstDiv === void 0 ? void 0 : history__container__firstDiv.remove();
    }
}
